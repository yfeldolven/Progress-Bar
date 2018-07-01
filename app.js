let model = {
  lstorage : JSON.parse( localStorage.getItem('progress') ),
  progress : {
    target : 100 ,
    progress : 90 ,
    where : 'Lesson 1'
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

            if( model.progress.progress < model.progress.target ){
              model.progress.progress++ ;
              view.progress.textContent = model.progress.progress ;
              control.progressBar('update');
            }

        };

        view.target.addEventListener( 'click' , function(){
          control.lightBox('target'); 
        });

        view.progress.addEventListener( 'click' , function(){
          control.lightBox('progress'); 
        });
      
      
      view.where.addEventListener( 'click' , function(){
        control.lightBox('where'); 
      });


      
      view.close.onclick = function(){
          view.box.style.display = 'none' ;
      }



    },
  
    
    lightBox : function(targettt){
          view.box.style.display = 'block' ;
          view.box.children[0].firstElementChild.focus();
          view.box.children[0].firstElementChild.value = model.progress[targettt];

          view.box.children[0].firstElementChild.onkeyup = function(){ 
              control.box(
              view.box.children[0].firstElementChild.value , targettt 
              );
              control.progressBar('update');

          };
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