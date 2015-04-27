;(function(){

  function saolei(){


    // 生成雷阵
    function bulei(a,b){
      var leizheng = new Array();

      for(var i = 0; i < a; i++){
        leizheng[i] = new Array();
        for(var j = 0; j < b; j++){
          if(Math.random() < 0.15626){
            leizheng[i][j] = '-1';
          }else{
            leizheng[i][j] = '0';
          }
        }
      }
      return leizheng;
    }



    // 添加数字
    function addshuzi(table){

      for(var i in table){

        for(var j in table){
          if(table[i][j] == 0 ){
            i = Math.floor(i);
            j = Math.floor(j);
            var a = 0,
                imax = table.length,
                jmax = table[i].length;
            if( i >= 1 && i <= imax+1 && j >= 1 && j <= jmax+1 )                 {a += table[i-1][j-1]==-1?1:0; console.log(i,j,i*j,table[i-1][j-1]);}
            if( i >= 1 && i <= imax+1 && j >= 0 && j <= jmax )                   {a += table[i-1][j]==-1?1:0; console.log(i,j,i*j,table[i-1][j]);}
            if( i >= 1 && i <= imax+1 && j >= -1 && j <= jmax-1 )                 {a += table[i-1][j+1]==-1?1:0; console.log(i,j,i*j,table[i-1][j+1]);}
            if( i >= 0 && i <= imax && j >= 1 && j <= jmax+1 )                   {a += table[i][j-1]==-1?1:0; console.log(i,j,i*j,table[i][j-1]);}
            if( i >= 0 && i <= imax && j >= -1 && j <= jmax-1 )                  {a += table[i][j+1]==-1?1:0; console.log(i,j,i*j,table[i][j+1]);}
            if( i >= -1 && i < imax-1 && j >= 1 && j <= jmax+1 )                 {a += table[i+1][j-1]==-1?1:0; console.log(i,j,i*j,table[i+1][j-1]);}
            if( i >= -1 && i < imax-1 && j >= 0 && j <= jmax)                    {a += table[i+1][j]==-1?1:0; console.log(i,j,i*j,table[i+1][j]);}
            if( i >= -1 && i < imax-1 && j >= -1 && j <= jmax-1)                  {a += table[i+1][j+1]==-1?1:0; console.log(i,j,i*j,table[i+1][j+1]);}

            table[i][j] = ''+a;
          }
        }
      }
    }



    // 更新面板
    function renewPanel(table){
      var width = table[0].length * 20;
      var htmlstr = '';
      $('#wrapper').width(width + table[0].length*2);
      for( var i in table){
        for ( var j in table[i] ){
          if( table[i][j] > 10 && table[i][j] < 18){
            htmlstr += '<div data-i="' + i + '" data-j=' + j + '>' + (Math.floor(table[i][j])-10) + '</div>';
          }else if( table[i][j] == 10 ){
            htmlstr += '<div data-i="' + i + '" data-j=' + j + '></div>';
          }else if( table[i][j] == 9 ){
            htmlstr += '<div class="lei" data-i="' + i + '" data-j=' + j + '>*</div>';
          }else if(  table[i][j] > 30 && table[i][j] <= 49 ){
            htmlstr += '<div class="leiclose" data-i="' + i + '" data-j=' + j + '>*</div>';
          }else {
            htmlstr += '<div class="close" data-i="' + i + '" data-j=' + j + '></div>';
          }

        }
      }
      $('#wrapper').html(htmlstr);
    }


    // 扫雷
    function shaolei(table){
      $('#wrapper').on('mousedown','.close',function(e){
          if( e.button == 0 ){
            var i = $(this).data('i');
            var j = $(this).data('j');

            if(table[i][j] < 8) {
              table[i][j] = Math.floor(table[i][j]) + 10;
            }

            if(table[i][j] == 10){
              showEmpty(i,j,table);
            }

            if(table[i][j] == 9){
              alert('YOU LOST!!!');
              showlei(table);
            }

            renewPanel(table);
            iswin(table);
          }else{
              $(this).addClass('leiclose').removeClass('close').html('*');
              table[i][j] = Math.floor(table[i][j]) + 30;
          }
      })
      $('#wrapper').on('mousedown','.leiclose',function(e){
        var i = $(this).data('i');
        var j = $(this).data('j');
        if( e.button == 2 ){
          $(this).removeClass('leiclose').addClass('close').html('');
          table[i][j] = Math.floor(table[i][j]) - 30;
        }
      })
    }

    //显示相邻空格
    function showEmpty(i,j,table){
      var a = i,
          b = j,
          imax = table.length-1,
          jmax = table[i].length-1;

      // for(var i = a; i >= 0; i--){
      //   for(var j = jmax; j >=0; j--){
      //     if(table[i][j] == 10){console.log(1,i,j,table[i][j])
      //       if( j > 0 ){
      //         if(table[i][j-1]==0) table[i][j-1] = Math.floor(table[i][j-1])+10;
      //       }
      //       if( i > 0 ){
      //         if(table[i-1][j]==0) table[i][j-1] = Math.floor(table[i][j-1])+10;
      //       }
      //     }
      //   }
      // }
      // for(var i = a; i <= imax; i++){
      //   for(var j = 0; j <= jmax; j++){
      //     if(table[i][j] == 10){console.log(2,i,j,table[i][j])
      //       if( j > jmax ){
      //         if(table[i][j+1]==0) table[i][j-1] = Math.floor(table[i][j-1])+10;
      //       }
      //       if( i < imax ){
      //         if(table[i+1][j]==0) table[i+1][j] = Math.floor(table[i+1][j])+10;
      //       }
      //     }
      //   }
      // }
      for(var i in table){
        for(var j in table[i]){
          if ( table[i][j] == 0 ) {
            table[i][j] = Math.floor(table[i][j])+10;
          }
        }
      }
    }


    // 是否胜利
    function iswin(table){
        for(var i in table){
          for(var j in table[i]){
            if ( table[i][j] > 0 && table[i][j] < 10 ) {
              return false;
            }
          }
        }
      alert('YOU WIN!!!');
    }

    function showlei(table){
      for(var i in table){
        for(var j in table[i]){
          if ( table[i][j] == -1 ) {
            table[i][j] = Math.floor(table[i][j])+10;
          }
        }
      }
      $(document).off('click','#wrapper div');
    }

    // 初始化
    this.init = function(){
      var place = bulei(8,8);
      addshuzi(place);
      renewPanel(place);
      shaolei(place);
      document.body.onselectstart=document.body.oncontextmenu=function(){ return false;}
    }

  }

  var saolei1 = new saolei();

  saolei1.init();

  $('.renew').click(function(){
    saolei1.init();
  })

}());