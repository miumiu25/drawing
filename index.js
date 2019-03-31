
var drawingObj = {
    cavs:$('.cavs'),
    ctx:$('.cavs').get(0).getContext('2d'),
    colorBoard:$('#colorBoard'),
    arrImg:[],
    lineRuler:$('#lineRuler'),
    bool:false,
    init:function(){
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.draw();
        this.btnFn();
    },
    draw:function(){
        var cavs = this.cavs,
            self = this;
        var c_x = cavs.offset().left,
            c_y = cavs.offset().top;
            cavs.mousedown(function(e){
                e = e || window.event;
                self.bool = true;
                var m_x = e.pageX - c_x,
                    m_y = e.pageY - c_y;
                    self.ctx.beginPath();
                    self.ctx.moveTo(m_x,m_y);
                    cavs.mousemove(function(e){
                        if(self.bool){
                            self.ctx.lineTo(e.pageX - c_x,e.pageY - c_y);
                            self.ctx.stroke();
                        }
                    })
                    cavs.mouseup(function(){
                        self.ctx.closePath();
                        self.bool = false;
                    })
                    cavs.mouseleave(function(){
                        self.ctx.closePath();
                        self.bool = false;
                    })
                    var imgData = self.ctx.getImageData(0,0,self.cavs[0].width,self.cavs[0].height);
                    self.arrImg.push(imgData);

            })
    },
    btnFn:function(){
        var self = this;
        $('.btn-list').on('click',function(e){
            e = e || window.event;
            switch(e.target.id){
                case 'clearBoard':
                self.ctx.clearRect(0,0,self.cavs[0].width,self.cavs[0].height)
                break;
                case 'eraser':
                self.ctx.strokeStyle = '#fff';
                break;
                case 'rescind':
                if(self.arrImg.length > 0){
                    self.ctx.putImageData(self.arrImg.pop(),0,0);
                }
                break;
            }
        })
        this.colorBoard.change(function(e){
            self.ctx.strokeStyle = $(this).val();
            
        })
        this.lineRuler.change(function(){
            self.ctx.lineWidth = $(this).val();
            console.log($(this).val())
        })
    }
}
drawingObj.init();