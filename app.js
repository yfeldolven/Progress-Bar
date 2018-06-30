let model = {
  lstorage : JSON.parse( localStorage.getItem('progress') ),
  progress : {
    target : 100 ,
    progress : 90 ,
    where : '???'
  },

  setLstorage : function( update ){
    if ( this.lstorage ){
        if( update ){
          localStorage.setItem('progress' , JSON.stringify( this.progress ) );
        }else{
          if (Object.keys(this.lstorage).length < 3){
            localStorage.removeItem('progress');
          }else{
            this.progress = this.lstorage ;
          }
        }

    }else{
      localStorage.setItem('progress' , JSON.stringify( this.progress ) );
    }


  }

},
    

control = {
    start : function(){
        view.target.textContent = model.progress.target ;
        view.progress.textContent = model.progress.progress ;
        view.where.textContent = model.progress.where ;

        
        view.Done.onclick = function(){
            model.progress.progress++ ;
            view.progress.textContent = model.progress.progress ;
            control.progressBar('update');
        };

        view.target.addEventListener( 'click' , function(){
           view.box.style.display = 'block' ;
           view.box.children[0].firstElementChild.value = model.progress.target;

           view.box.children[0].firstElementChild.onkeyup = function(){
              control.box(
                  view.box.children[0].firstElementChild.value , "target" 
              );
              control.progressBar('update');
           };

        });

      view.progress.addEventListener( 'click' , function(){
          view.box.style.display = 'block' ;
          view.box.children[0].firstElementChild.value = model.progress.progress;

          view.box.children[0].firstElementChild.onkeyup = function(){ 
              control.box(
              view.box.children[0].firstElementChild.value , "progress" 
              );
              control.progressBar('update');

          };
      });
      
      
      view.where.addEventListener( 'click' , function(){
          view.box.style.display = 'block' ;
          view.box.children[0].firstElementChild.value = model.progress.where;

          view.box.children[0].firstElementChild.onkeyup = function(){ 
              control.box(
              view.box.children[0].firstElementChild.value , "where" 
              );
              control.progressBar('update');

          };
      });

      view.close.onclick = function(){
          view.box.style.display = 'none' ;
      }



    },

    progressBar : function(update){
      let progressPercent = model.progress.progress / model.progress.target * 100 ;
      view.color.style.width = progressPercent + '%' ;
      view.color.textContent = `Your progress ${progressPercent.toFixed(1) } %`;
      model.setLstorage(update);
    },

    box : function ( value , targettt ){
      model.progress[targettt] = value;
      view[targettt].textContent = model.progress[targettt] ;
    },
    
  render : function(){
      model.setLstorage();
      this.start();
      this.progressBar();
  }
},
    
    

view = {
  target : document.querySelector('#target'),
  progress : document.querySelector('#progress'),
  Done : document.querySelector('BUTTON'),
  div : document.querySelector('DIV'),
  box : document.querySelector('.box'),
  close : document.querySelector('.box button'),
  color : document.querySelector('#color'),
  where : document.querySelector('#where')
};


control.render();