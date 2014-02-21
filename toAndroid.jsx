/*************************************************
Androidで必要な複数解像度のpngを作るマクロちゃん
CS4+Windowsでしかテストしてないよ Mac版のイラレを買ってくれたらテストするよ

created Kenji Matsuoka （http://firespeed.org）
Creative Commons Attribution 2.5.
*************************************************/
var folder = Folder.selectDialog("select folder");
var files = folder.getFiles("*.ai");
var defDpi=0.72;

dpis = new Array("ldpi",120/defDpi,"mdpi",160/defDpi,"hdpi",240/defDpi,"xhdpi",320/defDpi, "xxhdpi", 480/defDpi);
var dpiLength = dpis.length;
for(j=0; j < dpiLength;j+=2){
	var createFolder = new Folder (folder.fsName+"\\"+dpis[j]);
	createFolder.create();
}

var fileLength = files.length;

for (i=0; i < fileLength; i++){
	var file = File(files[i].fsName);
	app.open( file ); 
	var filePath=file.fsName;
	var fileName = filePath.substring(filePath.lastIndexOf('/')+1, filePath.length);
	fileName = fileName.substring(fileName.lastIndexOf('\\')+1, fileName.length); //for Win
	reg = new RegExp(".*\\.","g");
	fileName=fileName.match(reg);
	var options = new ExportOptionsPNG24();
	options.antiAliasing = true;
	options.transparency = true;
	options.artBoardClipping = true;
	for(j=0; j < dpiLength;j+=2){
		options.horizontalScale=dpis[j+1];
		options.verticalScale=dpis[j+1];
				var file=File(folder.fsName+"\\"+dpis[j]+"\\"+fileName+"png");
		app.activeDocument.exportFile(file,ExportType.PNG24,options);
	}
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
