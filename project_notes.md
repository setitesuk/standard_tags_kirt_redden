Standard Tags Task - Kirt Redden
================================


Future Releases / Additional Features:
--------------------------------------

Radio buttons at the top of the page allowing the user to sort the list by type.
The type variable from the radio would then be passed to the sorting function.

Add a function to remove unchecked tags from each annotation tag, returning only the data that is specific to each tag.

Example:

Type:
[X] Feature
Feature:
[X] Start / End
[X] SIL/TIL
Text:
Lorem ipsum dolor sit amet, ad duo congue


Concerns
--------

I would like to take a look at the ‘organiseAnnotationTags()’ function.
I’m aware that concatenating strings can lead to slower performance.

I originally looked at using unshift() to insert matched strings to the beginning of a new array and then
push() to add the unmatched strings to the end of the array. I'd be interested to see the difference in performance.


I was unsure as to whether the user should be able to copy the entire tag or just the last text section.
I decided to go with just the text section but it would be simple enough to add the rest of the tag to
the modal if there has been a misunderstanding.



No jQuery
---------

This task would have been easier with the use of the jQuery library however I chose to complete the challenge
in straight javaScript.