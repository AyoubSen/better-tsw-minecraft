$ErrorActionPreference = "Stop"

$FullBundleUrl = "https://8ptatswgh8.ufs.sh/f/MnMh6jksMhBK6owz4Carpt9CFmu3axYEDPbydUBfNoVewiA2"
$NewModsBundleUrl = "https://8ptatswgh8.ufs.sh/f/MnMh6jksMhBKzeQeSVZ9par5dMy36g2Z1xYUKeotSL8RsG0E"
$PackName = "TSW Fabric"
$TempRoot = Join-Path $env:TEMP "tsw-fabric-updater"
$ZipPath = Join-Path $TempRoot "mods.zip"
$ExtractPath = Join-Path $TempRoot "extracted"

function Write-Step($Message) {
	Write-Host ""
	Write-Host "==> $Message" -ForegroundColor Cyan
}

function Confirm-Continue($Message) {
	$answer = Read-Host "$Message [y/N]"
	return $answer -eq "y" -or $answer -eq "Y"
}

function Select-Folder($Description) {
	Add-Type -AssemblyName System.Windows.Forms
	$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
	$dialog.Description = $Description
	$dialog.ShowNewFolderButton = $true

	if ($dialog.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK) {
		throw "No folder selected. Update cancelled."
	}

	return $dialog.SelectedPath
}

function Get-TargetPath {
	$defaultPrismPath = Join-Path $env:APPDATA "PrismLauncher\instances"

	Write-Host ""
	Write-Host "Choose where to install:"
	Write-Host "1) Open folder picker"
	Write-Host "2) Paste an absolute path"
	if (Test-Path $defaultPrismPath) {
		Write-Host ""
		Write-Host "Detected Prism instances folder:"
		Write-Host $defaultPrismPath -ForegroundColor Yellow
	}

	$choice = Read-Host "Enter 1 or 2"

	if ($choice -eq "2") {
		$path = Read-Host "Paste the Prism instance folder path or mods folder path"
		$path = $path.Trim().Trim('"')

		if (!(Test-Path $path)) {
			throw "Path does not exist: $path"
		}

		return (Resolve-Path -LiteralPath $path).Path
	}

	return Select-Folder "Select your Prism instance folder, or select the mods folder directly."
}

function Resolve-ModsFolder($SelectedPath) {
	$name = Split-Path $SelectedPath -Leaf
	if ($name -eq "mods") {
		return $SelectedPath
	}

	$modsPath = Join-Path $SelectedPath "mods"
	if (!(Test-Path $modsPath)) {
		New-Item -ItemType Directory -Path $modsPath | Out-Null
	}

	return $modsPath
}

function Select-Bundle {
	Write-Host ""
	Write-Host "Choose bundle:"
	Write-Host "1) Full mod bundle - backs up existing .jar files, then replaces them"
	Write-Host "2) Only new mods - keeps existing .jar files, then adds/overwrites the new ones"

	$choice = Read-Host "Enter 1 or 2"

	if ($choice -eq "2") {
		return @{
			Name = "only new mods"
			Url = $NewModsBundleUrl
			ReplaceExisting = $false
		}
	}

	return @{
		Name = "full mod bundle"
		Url = $FullBundleUrl
		ReplaceExisting = $true
	}
}

function Find-Jars($Path) {
	return Get-ChildItem -Path $Path -Recurse -File -Filter "*.jar"
}

function New-BackupFolder($ModsFolder, $Label) {
	$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
	$parent = Split-Path $ModsFolder -Parent
	$backupFolder = Join-Path $parent "$Label-$timestamp"
	New-Item -ItemType Directory -Path $backupFolder | Out-Null
	return $backupFolder
}

function Test-ZipFile($Path) {
	$bytes = [System.IO.File]::ReadAllBytes($Path)
	return $bytes.Length -ge 4 -and $bytes[0] -eq 0x50 -and $bytes[1] -eq 0x4B
}

Write-Host "$PackName updater" -ForegroundColor Green
Write-Host "Minecraft 1.21.1 / Fabric Loader 0.19.1"
Write-Host ""
Write-Host "This script downloads the hosted mods bundle, backs up your current .jar files, then installs the downloaded .jar files into the mods folder you select."
Write-Host "It only touches .jar files inside the selected mods folder."

if (!(Confirm-Continue "Continue?")) {
	Write-Host "Cancelled."
	exit 0
}

$bundle = Select-Bundle

Write-Step "Select your Prism instance folder or its mods folder"
$selectedPath = Get-TargetPath
$modsFolder = Resolve-ModsFolder $selectedPath

Write-Host "Selected mods folder: $modsFolder"
Write-Host "Selected bundle: $($bundle.Name)"
if (!(Confirm-Continue "Install $PackName $($bundle.Name) here?")) {
	Write-Host "Cancelled."
	exit 0
}

Write-Step "Preparing temporary files"
if (Test-Path $TempRoot) {
	Remove-Item -LiteralPath $TempRoot -Recurse -Force
}
New-Item -ItemType Directory -Path $TempRoot | Out-Null
New-Item -ItemType Directory -Path $ExtractPath | Out-Null

Write-Step "Downloading mods bundle"
Invoke-WebRequest -Uri $bundle.Url -OutFile $ZipPath

if (!(Test-ZipFile $ZipPath)) {
	throw "Downloaded bundle is not a .zip file. The updater can only extract .zip files with Windows built-in tools. Re-upload this bundle as a .zip, then update the URL in the app/script."
}

Write-Step "Extracting bundle"
Expand-Archive -LiteralPath $ZipPath -DestinationPath $ExtractPath -Force
$downloadedJars = Find-Jars $ExtractPath

if ($downloadedJars.Count -eq 0) {
	throw "The downloaded zip did not contain any .jar files."
}

Write-Host "Found $($downloadedJars.Count) mod files in the bundle."

$existingJars = Get-ChildItem -Path $modsFolder -File -Filter "*.jar" -ErrorAction SilentlyContinue
if ($bundle.ReplaceExisting -and $existingJars.Count -gt 0) {
	Write-Step "Backing up existing mods"
	$backupFolder = New-BackupFolder $modsFolder "mods-backup"
	foreach ($jar in $existingJars) {
		Move-Item -LiteralPath $jar.FullName -Destination $backupFolder
	}
	Write-Host "Backed up $($existingJars.Count) existing .jar files to: $backupFolder"
} elseif (!$bundle.ReplaceExisting) {
	Write-Host "Keeping existing .jar files because only-new-mods mode was selected."

	$existingByName = @{}
	foreach ($jar in $existingJars) {
		$existingByName[$jar.Name] = $jar
	}

	$conflicts = @()
	foreach ($jar in $downloadedJars) {
		if ($existingByName.ContainsKey($jar.Name)) {
			$conflicts += $existingByName[$jar.Name]
		}
	}

	if ($conflicts.Count -gt 0) {
		Write-Host ""
		Write-Host "The following existing mods have the same filename as downloaded mods and will be overwritten:" -ForegroundColor Yellow
		foreach ($jar in $conflicts) {
			Write-Host " - $($jar.Name)"
		}

		if (!(Confirm-Continue "Back up and overwrite these $($conflicts.Count) file(s)?")) {
			Write-Host "Cancelled before installing."
			exit 0
		}

		Write-Step "Backing up files that will be overwritten"
		$backupFolder = New-BackupFolder $modsFolder "mods-overwritten-backup"
		foreach ($jar in $conflicts) {
			Copy-Item -LiteralPath $jar.FullName -Destination $backupFolder -Force
		}
		Write-Host "Backed up $($conflicts.Count) file(s) to: $backupFolder"
	}
}

Write-Step "Installing new mods"
foreach ($jar in $downloadedJars) {
	Copy-Item -LiteralPath $jar.FullName -Destination $modsFolder -Force
}

$versionPath = Join-Path $modsFolder ".tsw-fabric-version"
"2026-04-25-1" | Set-Content -LiteralPath $versionPath

Write-Step "Done"
Write-Host "Installed $($downloadedJars.Count) mods into: $modsFolder" -ForegroundColor Green
Write-Host "Launch the Prism instance and confirm Minecraft 1.21.1 / Fabric Loader 0.19.1."
Write-Host ""
Read-Host "Press Enter to close"
