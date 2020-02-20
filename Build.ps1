[CmdletBinding()]
param([string] $frozenModel = "..\SegmentationModel\frozen_inference_graph.pb", 
      [bool] $buildService = $true,
      [bool] $buildApp = $true,
      [Parameter(Mandatory=$true)][string] $dockerUserName,
      [Parameter(Mandatory=$true)][securestring] $dockerPassword,      
      [Parameter(Mandatory=$true)][string] $dockerRegistry,
      [string] $dockerWebAppRepository,
      [string] $dockerServiceRepository)

[PSCredential]::new(0, $dockerPassword).GetNetworkCredential().Password | docker login --username=$dockerUserName --password-stdin $dockerRegistry

if ($buildService -eq $true)
{
    $dockerBuildPath = "./src/service"
    Copy-Item $frozenModel $dockerBuildPath
    docker build --rm -f "./src/service/Dockerfile" -t "$($dockerRegistry)/$($dockerServiceRepository)" "./src/service"
    docker push "$($dockerRegistry)/$($dockerServiceRepository)"
    $modelName = Split-Path $frozenModel -leaf
    Remove-Item (Join-Path -Path $dockerBuildPath -ChildPath $modelName)
}

if ($buildApp -eq $true)
{
    docker build --rm -f "./src/webapp/Dockerfile" -t "$($dockerRegistry)/$($dockerWebAppRepository)" "./src/webapp"   
    docker push "$($dockerRegistry)/$($dockerWebAppRepository)"
}