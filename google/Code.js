const baseUrl = "https://rhs-pivot-backend.herokuapp.com";
// PATCH request at presentation launch
const PATCH_PRESENTATION_URL = "https://rhs-pivot-backend.herokuapp.com/api/presentations/{presentation_id}";
// PUT request: pivot question added/changed
const PUT_PIVOT_URL = "https://rhs-pivot-backend.herokuapp.com/api/presentations/{presentation_id}/pivots/{slide_id}";
const GET_PIVOT_URL = "https://rhs-pivot-backend.herokuapp.com/api/presentations/{presentation_id}/pivots/";
const BAR_HEIGHT = 20;
const BAR_ID = "PIVOT_BAR_ID";

function include(filename) {
  // templating function for separation of concerns
  // see scriptlet tags in html
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function onOpen() {
  SlidesApp.getUi()
    .createMenu("Pivot")
    .addItem("Pivot this slide", "showSidebar")
    .addToUi();
}

function showSidebar() {
  // templating of stylesheet and client-side JS
  var html = HtmlService.createTemplateFromFile("Page")
    .evaluate()
    .setTitle("Pivot");
  SlidesApp.getUi().showSidebar(html);
}

function processForm(formObject) {
  addMarkerToSlide();
  const url = PUT_PIVOT_URL.replace(/{presentation_id}/, formObject.presentationid-field).replace(/{slide_id}/, formObject.slideid-field);
  const options = {
    method: "POST",
    payload: formObject,
  };
  const res = UrlFetchApp.fetch(url, options);
  if (res.getResponseCode===200) {
    addMarkerToSlide();
  }
  return res.getResponseCode() === 200;
}

function addMarkerToSlide() {
    const presentation = SlidesApp.getActivePresentation();
    var selection = SlidesApp.getActivePresentation().getSelection();
    var slide = selection.getCurrentPage();
    const x = 0;
    const y = presentation.getPageHeight() - BAR_HEIGHT;
    const barWidth = presentation.getPageWidth();
      var bar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, x, y,barWidth, BAR_HEIGHT);
      bar.getBorder().setTransparent();
      bar.getText().insertText(0,"PIVOT - Submit Your Answer!");
      bar.setLinkUrl(BAR_ID);
}

function getPresentationAndSlideIds() {
  try {
    var presentationId = SlidesApp.getActivePresentation().getId();
    var selection = SlidesApp.getActivePresentation().getSelection();
    var pageId = selection.getCurrentPage().getObjectId();
    return { presentationId, pageId };
  } catch (err) {
    // TODO - Handle Exception
    Logger.log("Failed with error %s", e.message);
  }
}

function updatePivotPresentation(presentation_id) {
  const slides = getSlideData();
  const options = {
    method: "PATCH",
    payload: slides
  }
  const url = PATCH_PRESENTATION_URL
    .replace(/{presentation_id}/, presentation_id)
  const res = UrlFetchApp.fetch(url, options)
  console.log("PIVOT LAUNCH: server response status "+ res.getResponseCode);
}

function getSlideData() {
  // TODO: change to getActivePresentation when not using test
  var presentation_id = '19a5zn25Nf-PWijQ3SqTJTy7qtEioiz5Qf8LY3boiW5I';
  var presentation = SlidesApp.openById(presentation_id);
  const slides = [];
  presentation.getSlides().forEach(function(slide, i) {
    var slide_id = slide.getObjectId();
    var thumbnail = Slides.Presentations.Pages.getThumbnail(presentation_id, slide_id, {
      'thumbnailProperties.thumbnailSize': 'LARGE'
    });
    Logger.log(thumbnail.contentUrl);
    slides.push({slide_id, slide_image_url: thumbnail.contentUrl});
  });
  Logger.log(slides);
  return slides;
}