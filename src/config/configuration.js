{
    try {
        importScript('errors/runtime-error');

        sbVideoScript.settings = {
            compositionYouTubeNameExtension: ' YouTube',
            compositionTemplates: {
                'Lower Third': {
                    youtubeAlternative: true,
                    isSizeAlternative: true,
                    sizeAlternative: 'Full Screen',
                    isSelectable: true
                },
                'Lower Third YouTube': {
                    youtubeAlternative: false,
                    isSizeAlternative: true,
                    sizeAlternative: 'Full Screen YouTube',
                    isSelectable: false
                },
                'Full Screen': {
                    youtubeAlternative: true,
                    isSizeAlternative: true,
                    sizeAlternative: 'Full Screen 2-lines',
                    isSelectable: true
                },
                'Full Screen 2-lines': {
                    youtubeAlternative: false,
                    isSizeAlternative: true,
                    sizeAlternative: 'Full Screen 3-lines',
                    isSelectable: false
                },
                'Full Screen 3-lines': {
                    youtubeAlternative: false,
                    isSizeAlternative: true,
                    sizeAlternative: 'Full Screen 4-lines',
                    isSelectable: false
                },
                'Full Screen 4-lines': {
                    youtubeAlternative: false,
                    isSizeAlternative: true,
                    sizeAlternative: 'Two Columns',
                    isSelectable: false
                },
                'Full Screen YouTube': {
                    youtubeAlternative: false,
                    isSizeAlternative: true,
                    sizeAlternative: 'Full Screen YouTube smaller',
                    isSelectable: false
                },
                'Full Screen YouTube smaller': {
                    youtubeAlternative: false,
                    isSizeAlternative: false,
                    isSelectable: false
                },
                'Two Columns': {
                    youtubeAlternative: true,
                    isSizeAlternative: true,
                    sizeAlternative: 'Two Columns YouTube',
                    isSelectable: true
                },
                'Two Columns YouTube': {
                    youtubeAlternative: false,
                    isSizeAlternative: false,
                    isSelectable: false
                },
                'Scripture': {
                    youtubeAlternative: true,
                    isSizeAlternative: false,
                    splitLongTexts: true,
                    isSelectable: true
                },
                'Scripture YouTube': {
                    youtubeAlternative: false,
                    isSizeAlternative: false,
                    splitLongTexts: true,
                    isSelectable: false
                }
            },
            splitSettings: {
                splitPositions: {
                    allTexts: ['. ', '? ', '! ', '; ', ', ', ' - ', ' – ', '...', '…', '. . .'],
                    'Text German': ['und'],
                    'Text English': ['and', 'than', 'then'],
                },
                seperatorForSplitting: '...',
                markerForSplitPositions: '*{}*',
                bracketsForLayerCounting: '{#}',
                markSplittedCompsWith: ' [splitted layers]',
                animationProtectionTime: 0.5,
            },
            badCharactersToBeReplaced: "''",
            compositionNameForInOuts: 'Comp for In-Outs',
            folderNameForTrash: 'ZZZ Temporary Items For Trash',
            mainCompositionsToBuild: {
                folderName: 'Sermon  - DELETE BEFORE NEXT SCRIPT START',
                compositionsConfig: [{
                    name: 'English Service',
                    columnsToSwap: {
                        'German': 2,
                        'English': 1
                    },
                    audioSettings: {
                        'Left Level': 100,
                        'Right Level': 100,
                        'Left Pan': -100,
                        'Right Pan': 100
                    }
                }, {
                    name: 'German YouTube',
                    columnsToSwap: {
                        'German': 1
                    },
                    audioSettings: {
                        'Left Level': 0,
                        'Right Level': 100,
                        'Left Pan': 0,
                        'Right Pan': 0
                    }
                }],
                dateFormat: 'dd.mm.yyyy'
            },
            minimumSermonDurationInMin: 10,
            markersNeededInTemplateComps: 2,
            preferredSermonFormat: 'PRPROJ',
            parentFolderFootageExtensions: " Footage [Script Results]",
            requiredFieldsInCSV: [],
            standardCSVDelimiter: "\t",
            maskLayerNamePrefix: 'Mask',
            lineLayerNamePrefix: 'Line',
            fillInHandling: {
                showFromBeginning: {
                    delimiter: '&&&&',
                    textMaskHandling: 'show'
                },
                showWithAnimation: {
                    delimiter: '[]',
                    textMaskHandling: 'animate'
                },
                hideText: {
                    delimiter: '$$$$',
                    textMaskHandling: 'hide'
                }
            },
            delimiterForNewLines: '{n}',
            maximumFontSizeChange: -0.15,
            animationProtectionTime: 2,
            tolerancePxForMaskPositioning: 4,
            preComposedMaskLayerExtension: '-composed-',
            timeSeperator: ';',
            languageIndexNumber: 0, // the original language is used, otherwise index of the array will be set here
            propertyTranslations: {
                languages: ['English', 'German'],
                'Effects': ['Effects', 'Effekte'],
                'Stereo Mixer': ['Stereo Mixer', 'Stereo-Mischpult'],
                'Left Level': ['Left Level', 'Pegel links'],
                'Right Level': ['Right Level', 'Pegel rechts'],
                'Left Pan': ['Left Pan', 'Balance links'],
                'Right Pan': ['Right Pan', 'Balance rechts']
            }
        };

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: 'configuration',
            title: 'Error loading settings',
            message: e.message
        });
    }
}
