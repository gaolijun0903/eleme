<template>
	<div class="star" :class="starType">
		<span class="star-item" v-for="itemclass in itemclasses" :class="itemclass"></span>
	</div>
</template>

<script>
const LENGTH = 5;
const CLS_on = "on";
const CLS_off = "off";
const CLS_half = "half";

export default{
	props:{
		size:{
			type:Number
		},
		score:{
			type:Number
		}
	},
	computed:{
		starType() {
			return "star"+this.size
		},
		itemclasses() {
			let result=[];
			let score = Math.floor(this.score*2)/2;
			let hasDecimal = score%1 !== 0;
			let integer = Math.floor(score);
			for(let i=0; i<integer; i++){
				result.push(CLS_on);
			}
			if(hasDecimal){
				result.push(CLS_half);
			}
			while(result.length<LENGTH){
				result.push(CLS_off);
			}
			return result
		}
	}
}
</script>

<style>
.star{
	font-size:0;
}
.star span.star-item{
	display:inline-block;
	background-size: 100%;
	background-repeat: no-repeat;
}
.star span.star-item:last-child{
	margin-right: 0;
}


.star24 .star-item{
	width:10px;
	height:10px;
	margin-right:3px;
}
.star24 .star-item.on{
	background-image:url(star24_on@2x.png)
}
.star24 .star-item.half{
	background-image:url(star24_half@2x.png)
}
.star24 .star-item.off{
	background-image:url(star24_off@2x.png)
}


.star36 .star-item{
	width:15px;
	height:15px;
	margin-right:6px;
}
.star36 .star-item.on{
	background-image:url(star36_on@2x.png)
}
.star36 .star-item.half{
	background-image:url(star36_half@2x.png)
}
.star36 .star-item.off{
	background-image:url(star36_off@2x.png)
}


.star48 .star-item{
	width:20px;
	height:20px;
	margin-right:22px;
}
.star48 .star-item.on{
	background-image:url(star48_on@2x.png)
}
.star48 .star-item.half{
	background-image:url(star48_half@2x.png)
}
.star48 .star-item.off{
	background-image:url(star48_off@2x.png)
}
</style>