<template>
<div class="ratingselect">
	<div class="rating-type border1px">
		<span class="block positive" :class="{'active':myselectType===2}" @click="select(2,$event)">{{desc.all}}<span class='count'>{{ratings.length}}</span></span>
		<span class="block positive" :class="{'active':myselectType===0}" @click="select(0,$event)">{{desc.positive}}<span class='count'>{{positives.length}}</span></span>
		<span class="block negtive" :class="{'active':myselectType===1}" @click="select(1,$event)">{{desc.negtive}}<span class='count'>{{negtives.length}}</span></span>
	</div>
	<div class="switch on" v-show="myonlyContent===1" @click="toggleContent(1,$event)">
		<span class="icon-check_circle"></span>
		<span class="text">只看有内容的评价</span>
	</div>
	<div class="switch" v-show="myonlyContent===0" @click="toggleContent(0,$event)">
		<span class="icon-check_circle"></span>
		<span class="text">只看有内容的评价</span>
	</div>
</div>
</template>

<script>
const POSITIVE = 0;
const NEGTIVE = 1;
const ALL =2;

export default{
	props:{
		ratings:{
			type:Array,
			default(){
				return []
			}
		},
		selectType:{
			type:Number
		},
		onlyContent:{
			type:Boolean,
			default:true
		},
		desc:{
			type:Object,
			default(){
				return {
					all:'全部',
					positive:'满意',
					negtive:'不满意'
				}
			}
		}
	},
	computed:{
		myselectType(){
			return this.selectType
		},
		myonlyContent(){
			if(this.onlyContent){
				return 1
			}else{
				return 0
			}
		},
		positives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType === POSITIVE;
			})
		},
		negtives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType === NEGTIVE;
			})
		}
	},
	methods:{
		select(type,ev){
			if(!ev._constructed){
				return;
			}
			this.myselectType = type;  //视频教程13章中的补充：可以不在这里修改这个属性，返回给父组件，在父组件中修改就好了
			this.$emit("ratingType",type);
		},
		toggleContent(flag,ev){
			if(!ev._constructed){
				return;
			}
			if(flag===1){
				this.myonlyContent = 0;
				this.$emit("contentToggle",false);
			}else{
				this.myonlyContent = 1;
				this.$emit("contentToggle",true);
			}
		}
	}
}
</script>

<style>
.ratingselect{
	
}
.ratingselect .rating-type{
	padding: 18px 0;
	margin:0 18px;
	/*border-bottom:1px solid rgba(7,17,27,0.1);*/
	font-size: 0;
}
.ratingselect .rating-type .block{
	display: inline-block;
	padding:8px 12px;
	margin-right: 8px;
	font-size: 12px;
	line-height: 16px;
	border-radius: 2px;
	color: rgb(77,85,93);
}
.ratingselect .rating-type .positive{
	background:rgba(0,160,220,0.2);
}
.ratingselect .rating-type .negtive{
	background:rgba(77,85,93,0.2);
}
.ratingselect .rating-type .positive.active{
	background:rgb(0,160,220);
	color: #FFFFFF;
}
.ratingselect .rating-type .negtive.active{
	background:rgb(77,85,93);
	color: #FFFFFF;
}
.ratingselect .rating-type .block .count{
	font-size: 8px;
	margin-left: 2px;
}
.ratingselect .switch{
	padding:12px 18px;
	font-size: 0;
	line-height: 24px;
	border-bottom: 2px solid rgba(7,17,27,0.1);
	color:rgb(147,153,159);
}
.ratingselect .switch.on{
	color:#00c850;
}
.ratingselect .switch .icon-check_circle{
	display: inline-block;
	vertical-align: middle;
	font-size: 24px;
	margin-right: 4px;
}
.ratingselect .switch .text{
	display: inline-block;
	vertical-align: middle;
	font-size: 12px;
}
</style>