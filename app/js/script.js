var checklistOptions = document.querySelectorAll('.checklist__option'),
liveList= document.querySelector('.dragndrop__liveFileUpload'),
popup= document.querySelector('.popup'),
sideNav= document.querySelector('.sideNav'),
pages= document.querySelector('.docMainContainer').children;

//Event-listeners add
document.getElementById('hamburger').addEventListener('click',hamburgerHandler);
document.querySelector('.dropdown').addEventListener('click',listselect);
document.querySelector('.profile__name').addEventListener('click',() => {popup.classList.toggle('hide');});

//dropdown listener add
document.querySelector('.dropdown_list').addEventListener("click",(e)=> {
  if(e.target.matches('.dropdown_list__item')){
    document.querySelector('.list_activeitem').innerHTML=e.target.innerHTML;
  }
});

//boxCheck item listener add
document.querySelector('.box-item-wrapper').addEventListener('click',(e)=>{
   if(e.target.matches('.checklist__checkbox')){
      e.target.parentElement.parentElement.classList.toggle('option-checked');
      console.log(e.target);
    }
});

//checklist-listeners
for(let i=0;i<checklistOptions.length;i++)
{
  checklistOptions[i].addEventListener('click',function(){
    this.classList.toggle('option-checked');
  });
}

function hamburgerHandler(){
  sideNav.classList.toggle('expand');
  let overlay = document.querySelector('.body-overlay');
  overlay.classList.toggle('expand');
  overlay.addEventListener('click',function(){
    sideNav.classList.remove('expand');
    this.classList.remove('expand');
  });
}

function listselect(){
  let activeItem= this.querySelector('.dropdown_list-container');
  activeItem.classList.toggle('dropdown-active');
}


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

liveList.addEventListener('click',function(e){
  if(e.target && e.target.matches(".liveFileUpload__file-delete")){
    e.target.parentElement.remove();
    if(!liveList.children.length)
    {
      liveList.classList.add('hide');
    }
  }
});

// drag and drop on drop event stopper
window.addEventListener("dragover",function(e){
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e.preventDefault();
},false);

// function myhelper( target)
// myhelper(window, ['dragover', 'drag'], handler);
//
// eventTarget.addEventListener(event, handler);
// myhelper(eventTarget, [event], handler);

//drag and drop on drop event handler
function drop(){
  var dt = event.dataTransfer;
  var files = dt.files;
  liveList.classList.remove('hide');
  for (let i = 0; i < files.length; i++) {
    var fileListTemplate = `<li class="liveFileUpload__file">
      <img class="liveFileUpload__file-image"src="images/file-type-icon/type-pdf.svg" alt="">
      <span class="liveFileUpload__file-name">${files[i].name}</span>
      <span class="liveFileUpload__file-type">${files[i].type}</span>
      <span class="liveFileUpload__file-size">${(files[0].size/1024).toPrecision(1)}MBs</span>
      <span class="liveFileUpload__file-state">UPLOADED</span>
      <img  class="liveFileUpload__file-delete" src="images/trashcan/trashcan.png" alt=""></li>`;
      liveList.innerHTML+= fileListTemplate;
    }
}
