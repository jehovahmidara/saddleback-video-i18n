'use strict';import createCompsFromTextFile from './functions/create-comps-from-text-file';import createArrayFromFile from './functions/extendscript-file-handling';// Open a dialog and ask for a file and return an array of lines of that file.var contentAry = createArrayFromFile();// consolidate settings for the script// TODO: bring the settings to the UIvar settings = {	compositionYouTubeNameExtension: ' YouTube',	compositionTemplates: [{		name: 'Lower Third',		youtubeAlternative: true,		isSizeAlternative: true,		sizeAlternative: 'Full Screen'	}, {		name: 'Full Screen',		youtubeAlternative: true,		isSizeAlternative: false	}, {		name: 'Scripture',		youtubeAlternative: false,		isSizeAlternative: false	}]};// If we have a file,if (contentAry !== null) {	app.beginUndoGroup("Import Text");	createCompsFromTextFile(contentAry);	app.endUndoGroup();}