var checklistOptions = document.querySelectorAll('.checklist__option');
var boxCheck = document.querySelectorAll('.box-check-item');
var liveList= document.querySelector('.dragndrop__liveFileUpload');
var child= liveList.childNodes;
var footer= document.querySelector(".page-footer");
var profilePopup = document.querySelector('.profile__name');
var popup= document.querySelector('.popup');
var sideNav= document.querySelector('.sideNav');
var pages= document.querySelector('.docMainContainer').children;
var dt;
var files;
addDFileDeleteAction();

//hamburger-toggle
document.getElementById('hamburger').addEventListener('click',function(){
sideNav.classList.toggle('expand');
document.querySelector('.body-overlay').classList.toggle('expand');
document.querySelector('.body-overlay').addEventListener('click',function(){
  sideNav.classList.remove('expand');
  this.classList.remove('expand');
});
});

//page-shift
function GotoNextPage(curr){
for(let i=0;i<pages.length;i++)
{
  if(pages[i].contains(curr))
  {
    pages[i].classList.add('hide');
    pages[i+1].classList.remove('hide');
  }
}
}
function GotoPrevPage(curr){
for(let i=0;i<pages.length;i++)
{
  if(pages[i].contains(curr))
  {
    pages[i].classList.add('hide');
    pages[i-1].classList.remove('hide');
  }
}
}

//profile-section-Popup
profilePopup.addEventListener('click',function(){
popup.classList.toggle('hide');
});

//checklist-listeners
for(let i=0;i<checklistOptions.length;i++)
{
  checklistOptions[i].addEventListener('click',function(){
    this.classList.toggle('option-checked');
  });
}
for(let i=0;i<boxCheck.length;i++)
{
  boxCheck[i].addEventListener('click',function(){
    this.classList.toggle('option-checked');
  });
}

//dragand drop file delete aciton
function addDFileDeleteAction(){
  var deleteFIleButton= liveList.querySelectorAll('.liveFileUpload__file-delete');
  for(let i=0;i<deleteFIleButton.length;i++)
  {
      deleteFIleButton[i].addEventListener('click', function(){
      liveList.removeChild(this.parentNode);
      });
  }
}
// drag and drop on drop event stopper
window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

//drag and drop on drop event handler
function drop(){
  dt = event.dataTransfer;
  files = dt.files;
  for (let i = 0; i < files.length; i++) {
    let dupeNode = child[1].cloneNode(true);
    dupeNode.querySelector('.liveFileUpload__file-name').textContent=files[i].name;
    dupeNode.querySelector('.liveFileUpload__file-size').textContent=(files[0].size/1024).toPrecision(1)+"MBs";
    dupeNode.querySelector('.liveFileUpload__file-type').textContent=files[i].type;
    dupeNode.classList.remove('hide');
    liveList.appendChild(dupeNode);
    console.log(files);
    }
  addDFileDeleteAction();
}
