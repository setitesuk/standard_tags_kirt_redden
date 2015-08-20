'use strict';

(function () {

    var aUnsortedTags = annotation_tags.annotation_tags;
    var aSplitTags = [];

    var iStandardTagsLength = annotation_tags.annotation_tags.length;
    var iTagNumber;

    var oModalTip = document.getElementById('modal-copy-tip');
    var oModalTextContainer = document.getElementById('modal-text-container');
    var oPopupModal = document.getElementById('text-modal');
    var oTagsContainer = document.getElementById('standard-tags-container');
    var oTextCopyButton = document.getElementById('text-copy');

    var sMatchedType = "";
    var sModalText;
    var sSortedString;
    var sTagText;
    var sUnmatchedType = "";

    var i;
    var j;
    var k;

    oTagsContainer.innerHTML = "";

    function organiseAnnotationTags() {
        for (i = 1; i < iStandardTagsLength; i += 1) {

            aSplitTags = aUnsortedTags[i].split("\n");

            if (aSplitTags[iStandardTagsLength - 1] != undefined) {
                sTagText = "<span id='text-tag-" + i + "'>" + aSplitTags[iStandardTagsLength - 1] + "</span>";
                aSplitTags[iStandardTagsLength - 1] = sTagText;

                aUnsortedTags[i] = aSplitTags.toString().replace(/,/g, "\n");

                aUnsortedTags[i] += '<br/><a class="tag-button button small expand" id="text-update-' + i + '">Edit Tag Text</a>';
            }

            for (j = 1; j < aSplitTags.length; j += 1) {


                if (aSplitTags[j].charAt(1) === "X" && aSplitTags[j].search("Clone Information") != -1) {
                    sMatchedType += "<li class='tag'>" + annotation_tags.annotation_tags[i] + "</li>";
                    break;
                } else if (j === aSplitTags.length - 1) {
                    sUnmatchedType += "<li class='tag'>" + annotation_tags.annotation_tags[i] + "</li>";
                }
            }

        }

        sSortedString = sMatchedType + sUnmatchedType;
        oTagsContainer.innerHTML += sSortedString.replace(/\n/g, "<br/>");

        allocateEventListeners();

    }

    function allocateEventListeners() {

        for (k = 0; k < iStandardTagsLength; k += 1) {
            if (document.getElementById('text-update-' + k) != null) {
                document.getElementById('text-update-' + k).addEventListener("click", displayModal, false);
            }
        }

        document.getElementById('modal-close').addEventListener("click", hideModal, false);

        document.getElementById('text-confirm').addEventListener("click", updateModalText, false);

        oTextCopyButton.addEventListener("click", copyModalText, false);

    }


    function displayModal(event) {
        event.stopImmediatePropagation();
        oPopupModal.style.display = "block";
        oPopupModal.style.visibility = "visible";

        iTagNumber = this.id.substr(12);
        sTagText = document.getElementById('text-tag-' + iTagNumber).innerHTML;

        addInputFieldToString(sTagText);
    }


    function hideModal(event) {
        event.stopImmediatePropagation();
        oTextCopyButton.style.display = "none";
        oModalTip.style.display = "none";
        oPopupModal.style.display = "none";
        oPopupModal.style.visibility = "hidden";
    }


    function updateModalText(event) {
        event.stopImmediatePropagation();
        oTextCopyButton.style.display = "block";
        oModalTip.style.display = "block";
        sModalText = oModalTextContainer.innerHTML;
        sModalText = sModalText.replace(/<input type="text" onkeyup="this.dataset.value = this.value;" data-value="/ig, "");
        sModalText = sModalText.replace(/"> /ig, " ");
        oModalTextContainer.innerHTML = sModalText;
    }


    function copyModalText(event) {
        event.stopImmediatePropagation();
        window.prompt("Copy the text below or directly from the modal.", oModalTextContainer.innerHTML);
    }


    function addInputFieldToString(string) {
        // KR - Needs to be refactored.
        string = string.replace(/\{[a-z]*\s*[a-z]*\}/i, "<input type='text' onkeyup='this.dataset.value = this.value;' data-value=''> ");

        oModalTextContainer.innerHTML = string;

        if (string.search("{") !== -1) {
            addInputFieldToString(string);
        }
    }

    organiseAnnotationTags();

})();
