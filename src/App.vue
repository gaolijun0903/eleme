<template>
  <div id="app">
  	<v-header :seller="seller"></v-header>
  	<div class="tab border1px">
  		<div class="tab-item">
  			<router-link to="/goods">商品</router-link>
  		</div>
  		<div class="tab-item">
  			<router-link to="/ratings">评价</router-link>
  		</div>
  		<div class="tab-item">
  			<router-link to="/seller">商家</router-link>
  		</div>
  	</div>
  	<router-view :seller="seller"></router-view>
  </div>
</template>

<script>
	import header from "components/header/Header"
	
	const ERR_OK = 0;
	export default {
		name:"app",
	  data:()=>{
	  	return{
	  		seller:{}
	  	}
	  },
		components:{
			"v-header":header
		},
	  mounted:function(){
			this.$http.get("/api/seller").then((res)=>{
				var result = res.body;
				if(result.errno === ERR_OK){
					this.seller = result.data
				}
			},(err)=>{
				console.log(err)
			})
	  }
		
	}
</script>

<style scoped>
	div.tab{
		display:flex;
		width:100%;
		height:40px;
	}
	div.tab .tab-item{
		flex-grow: 1;
		line-height:40px;
		text-align:center;
		font-size:14px;
		color:rgb(77,85,93)
	}
	div.tab .router-link-active{
		color:rgb(240,20,20)
	}
</style>
