;(function() {
    'use strict';

    var Event = new Vue();//这是实例作为事件调度中心

    var alert_sound = document.getElementById('alert-sound')

    function copy(obj){
        return Object.assign({},obj);
    };



    Vue.component('task',{
        template:'#task-tpl',

        //母级传数据
        props:['todo'],
        methods:{
            action: function(name,params){
            Event.$emit(name,params);
            }
        },

    });




// 使用单例的方式来储存
    new Vue({
        el:'#main',
        data:{
            msg:"e23 ",
            list:[],
            last_id:0,
            current:{
                // title:"",
                // completed:false,
                // desc:'',
                // remind_at:'2020-10-1'

            },
           
        },  
        
        mounted: function(){

            var me = this;
            this.list = ms.get('list') || this.list;
            this.list_id = ms.get('list') || this.list_id;


            setInterval(function(){
                me.check_alerts();

            },1000);

 
            Event.$on('remove',function(id){
                if(id){
                    me.remove(id);
                }
            });

            Event.$on('toggle_complete',function(id){
                if(id){
                    me.toggle_complete(id);
                }
            });

            Event.$on('set_current',function(id){
                if(id){
                    me.set_current(id);
                }
            });

            Event.$on('toggle_detail',function(id){
                if(id){
                    me.toggle_detail(id);
                }
            });
        },


        methods:{
            check_alerts:function(){
                var me  = this;
                
                this.list.forEach(function(row,i){

                    var alert_at = row.alert_at;
                    if (!alert_at || row.alert_confirmed) return;

                    var alert_at = (new Date(alert_at)).getTime();
                    var now = (new Date()).getTime();


                    if(now >= alert_at){

                        alert_sound.play();
                        var confirmed = confirm(row.title);
                        Vue.set(me.list[i],'alert_confirmed',confirmed);
                    }
                })
            },



                merge: function(){
                    // console.log('this.current:',this.current.id)                  
                    var is_update,id;
                   
                    is_update = id= this.current.id

                    if (is_update){
                        var index = this.find_index(id); 
                        Vue.set(this.list,index,copy(this.current));
                        // this.list[index] = copy(this.current);
                        // console.log('item:',item);

                    }else{
                        var title = this.current.title;
                        if(!title && title !== 0) return;
                        var todo = copy(this.current);
    
                        this.last_id++;
                        ms.set('last_id',this.last_id);
                        todo.id= this.last_id + 1;
                        todo.id = this.last_id;
                        this.list.push(todo);
    

                    }
                    // ms.set('list',this.list);
                    this.reset_current();



                  
                },
                // update:function(){
                    
                // },

                toggle_detail:function(id){         //传进来一个ID
                    var index = this.find_index(id); //通过ID找索引

                    // this.list[index].show_detail;
                    Vue.set(this.list[index],'show_detail',!this.list[index].show_detail)

                },


                remove:function(id){
                    var index = this.find_index(id);
                    this.list.splice(index,1);

                    // 数据库操作
                    // ms.set('list',this.list);
                },

                next_id:function(){
                    return this.list.length +1;
                },
                
                set_current:function(todo){

                    this.current = copy(todo);

                },

                reset_current:function(){
                    this.set_current({});
                },

                find_index:function(id){
                    return this.list.findIndex(function(item){
                        return item.id == id;
                    })
                },

                toggle_complete:function(id){
                    var i = this.find_index(id);


                    Vue.set(this.list[i],'completed', !this.list[i].completed);
                    // this.list[i].complete = ! this.list[i].complete;

                    // console.log("这里是list列表中的complete属性值为：",this.list[i].complete)

                }
            
        },

        watch:{

            // 此时List在被监控
            list:{
                deep:true,
                handler:function(n,o){
                    if (n){
                        ms.set('list',n);

                    }else{
                        ms.set('list',[]);  
                    }

                }
            }
        }
    });
})();



// 以下 学习的方法

// 1. Object.assign（）

(function(){
    var new_list=[1,3,4,43534,34534];
    var copy_list = Object.assign({},new_list);

    console.log("复制的对象为:",copy_list);

    // setInterval(function(){
    //     var now_time = (new Date()).getTime();

    //     str_now_time= now_time.toString();


        
    //     console.log(typeof str_now_time);
    //     console.log("当前的时间是：",str_now_time);


    //     console.log("当前的时间是：",'年：',str_now_time.slice(0,4));


    // },1000)

  
    
})()