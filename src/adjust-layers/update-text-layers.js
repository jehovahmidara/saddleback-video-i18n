/**
Update the text layer of a given comp.

@Usage this is used to replace the text in duplicated "German" comps with text from a file.
@param comp {Object} - a composition.
@param parsedContentLine {Object} - an object which contains the information of a certain line of the CSV file in form of a structured object. parsedContentLine.layers stores the text layers with its originalLayerName, layerName and the text itself
@param parentFolder {Object} - the parentFolder where pre-composed layers will be consolidated
*/

{
    try {
        importScript('errors/runtime-error');
        importScript('adjust-layers/check-and-adjust-font-size');
        importScript('adjust-layers/check-fillin-layer-addresses');
        importScript('adjust-layers/create-and-position-masks-and-lines');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for updateTextLayers",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.updateTextLayers = function (comp, parsedContentLine, parentFolder) {
        try {
            if (!comp) { throw new Error("No composition provided") }

            var textLayers = parsedContentLine.layers;

            // DONE add several fill in options here
            // var fillInDelimiter = sbVideoScript.settings.fillInDelimiter;
            var fillInHandling = sbVideoScript.settings.fillInHandling;

            var resultingTextLayers = [];

            // let's check if we have permission to split the text
            var templateCompName = comp.name.split(" ");
            templateCompName.shift();
            templateCompName = templateCompName.join(" ");
            var textIsSplittable = sbVideoScript.settings.compositionTemplates[templateCompName].splitLongTexts;

            // we keep track if at least one layer was splitted
            var textWasSplitted = false;

            // iterate through all expected text layers
            for (var i = 0; i < textLayers.length; i++) {
                var newText = textLayers[i].text;

                if (newText) {
                    newText = newText.split(sbVideoScript.settings.delimiterForNewLines).join('\n');

                    // if newText is not empty we first load the data we need to process the text
                    var layerName = textLayers[i].layerName;
                    var originalLayerName = textLayers[i].originalLayerName;
                    var textLayer = comp.layer(layerName);

                    if (textLayer) {
                        // remove all possible fill in delimiters within the text to just handle the pure text
                        var resultText = newText;
                        for (var fillInOption in fillInHandling) {
                            var delimiter = fillInHandling[fillInOption].delimiter;
                            var len = delimiter.length / 2;
                            var delimiterLeft = delimiter.substring(0, len);
                            var delimiterRight = delimiter.substring(len, len*2);
                            resultText = resultText.replace(delimiterLeft,'').replace(delimiterRight,'');
                        }

                        // store baselines assuming the mask and line start at the very
                        // left of the template text and we only need to know how far
                        // it will be moved left or right
                        var textProp = textLayer.property("Source Text");
                        var textDocument = textProp.value;
                        var bl = textDocument.baselineLocs;
                        var baselines = {
                            x: bl[0],
                            y: bl[1]
                        };

                        // try to fit the text into the layer by adjusting the fontSize
                        var resultingTextLayer = {
                            layerName: layerName,
                            texts: sbVideoScript.checkAndAdjustFontSize(resultText, textLayer, originalLayerName, textIsSplittable, templateCompName)
                        };
                        resultingTextLayers.push(resultingTextLayer);

                        if (!textWasSplitted && resultingTextLayer.texts.length > 1) {
                            textWasSplitted = true;
                        }

                        // the script can't handle text where layers are splitted
                        // so the template should not have any masks and layers
                        // so we make sure we don't check for fill ins and thus
                        // replace the splitted text with the full text again
                        if (!textIsSplittable) {
                            // evaluate if there is more than one fill in
                            // or a fill in is splitted over lines
                            // if this is the case than duplicate masks and lines and precompose them

                            // DONE add several fill in options here
                            // var arrOfMaskAddresses = sbVideoScript.checkFillinLayerAddresses(newText, textLayer, fillInDelimiter);
                            var arrayOfMaskAddresses = sbVideoScript.checkFillinLayerAddresses(newText, textLayer);

                            var maskLayerName = sbVideoScript.settings.maskLayerNamePrefix + ' ' + layerName[layerName.length - 1];
                            var maskLayer = comp.layer(maskLayerName);
                            var lineLayerName = sbVideoScript.settings.lineLayerNamePrefix + ' ' + layerName[layerName.length - 1];
                            var lineLayer = comp.layer(lineLayerName);

                            // check if there is no fill in and hide the mask and the line
                            // check if there is more than one fill in
                            // if (arrOfMaskAddresses.length === 0) {
                            if (arrayOfMaskAddresses.length === 0) {
                                textLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
                                if (lineLayer) {
                                    lineLayer.remove();
                                }
                            } else {
                                if (maskLayer) {
                                    if (lineLayer) {
                                        // fill ins found, so we need to create and position the mask layers
                                        // DONE handle several fill in options here
                                        // sbVideoScript.createAndPositionMasksAndLines(arrOfMaskAddresses, maskLayer, lineLayer, baselines, parentFolder);
                                        sbVideoScript.createAndPositionMasksAndLines(arrayOfMaskAddresses, maskLayer, lineLayer, baselines, parentFolder);

                                    } else {
                                        // if lineLayer doesn't exist something is wrong with the template
                                        throw new Error("The current composition '"+ comp.name +"' shows that the layer '"+ lineLayerName +"' is missing. Please correct and run the script again.");
                                    }
                                } else {
                                    throw new Error("The current composition '"+ comp.name +"' shows that the layer '"+ maskLayerName +"' is missing. Please correct and run the script again.");
                                }
                            }
                        }
                    }
                }
            }

            if (textWasSplitted) {
                comp.name += sbVideoScript.settings.splitSettings.markSplittedCompsWith;
            }
            return resultingTextLayers;

        } catch (e) {
            if (e instanceof sbVideoScript.FontToSmallError) { throw e }

            var compInfo = "";
            try {
                compInfo += '[composition information: comp.name = '+ comp.name +']';
            } catch (e) {
                compInfo = "["+ compInfo +"; wasn't able to retrieve composition information]";
            }

            throw new sbVideoScript.RuntimeError({
                func: 'updateTextLayers',
                title: "Error updating text layer content "+ compInfo,
                message: e.message
            })
        }
    }
}
