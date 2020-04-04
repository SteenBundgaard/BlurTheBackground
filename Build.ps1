[CmdletBinding()]
param([string] $frozenModel = "..\SegmentationModel\frozen_inference_graph.pb", 
      [bool] $buildService = $true,
      [bool] $buildApp = $true,
      [Parameter(Mandatory=$true)][string] $dockerUserName,
      [Parameter(Mandatory=$true)][securestring] $dockerPassword)

[PSCredential]::new(0, $dockerPassword).GetNetworkCredential().Password | docker login --username=$dockerUserName --password-stdin $Env:dockerRegistry

if ($buildService -eq $true)
{
    $dockerBuildPath = "./src/service"
    Copy-Item $frozenModel $dockerBuildPath
    docker build --rm -f "./src/service/Dockerfile" -t $Env:ServiceImage "./src/service"
    docker push $Env:ServiceImage
    $modelName = Split-Path $frozenModel -leaf
    Remove-Item (Join-Path -Path $dockerBuildPath -ChildPath $modelName)
}

if ($buildApp -eq $true)
{
    docker build --rm -f "./src/webapp/Dockerfile" -t $Env:WebAppImage "./src/webapp"   
    docker push $Env:WebAppImage
}

docker logout $Env:dockerRegistry