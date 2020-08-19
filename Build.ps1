[CmdletBinding()]
param([string] $frozenModel = "/frozen_inference_graph.pb",
      [bool] $buildService = $true,
      [bool] $buildApp = $true)

$password = ConvertTo-SecureString $Env:DockerPassword -AsPlainText -Force
[PSCredential]::new(0, $password).GetNetworkCredential().Password | docker login --username=$Env:DockerUserName --password-stdin $Env:DockerRegistry

if ($buildService -eq $true) {
      $body = "{`"path`":`"$frozenModel`"}"
      $token = "Bearer $Env:AuthToken"
      $modelPath = "./src/service$frozenModel"
 
      Invoke-RestMethod `
            -Method POST `
            -Uri "https://content.dropboxapi.com/2/files/download" `
            -Headers @{ "Authorization" = $token; "Dropbox-API-Arg" = $body; "scope" = "files.content.read" } `
           -OutFile $modelPath -ContentType ""
      docker build --rm -f "./src/service/Dockerfile" -t $Env:ServiceImage "./src/service"
      docker push $Env:ServiceImage
      Remove-Item $modelPath
}

if ($buildApp -eq $true)
{
    docker build --rm -f "./src/webapp/Dockerfile" -t $Env:WebAppImage "./src/webapp"   
    docker push $Env:WebAppImage
}

docker logout $Env:DockerRegistry