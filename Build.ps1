param([string] $frozenModel = "..\SegmentationModel\frozen_inference_graph.pb", 
      [bool] $buildService = $true,
      [bool] $buildApp = $true)

if ($buildService -eq $true)
{
    $dockerBuildPath = "./src/service"
    Copy-Item $frozenModel $dockerBuildPath
    docker build --rm -f "./src/service/Dockerfile" -t blurthebackground:latest "./src/service"
    $modelName = Split-Path $frozenModel -leaf
    Remove-Item (Join-Path -Path $dockerBuildPath -ChildPath $modelName)
}

if ($buildApp -eq $true)
{
    npm run-script build --prefix .\src\webapp\
}