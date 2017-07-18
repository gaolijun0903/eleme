<template>
<div class="shopcart">
	<div class="content">
		<div class="content-left">
			<div class="logo-wrapper">
				<div class="logo">
					<i class="icon-shopping_cart"></i>
				</div>
			</div>
			<div class="price">￥{{totalPrice}}</div>
			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="content-right">
			<div class="pay">
				￥{{minPrice}}元起送
			</div>
		</div>
	</div>
</div>
</template>

<script>
	
export default{
	props:{
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		},
		selectedFoods:{
			type:Array,
			default:()=>{
				return [
					{
						goodsId:'001',
						name:"aaa",
						price:10,
						quantity:2
					},{
						goodsId:'002',
						name:"bbb",
						price:12,
						quantity:1
					}
				]
			}
		}
	},
	data(){
		return{
			
		}
	},
	computed:{
		totalPrice:()=>{
			let total = 10;
			let arr = this.selectedFoods;
			console.log(arr)
//			this.selectedFoods.forEach((food)=>{
//				total += food.price*food.quantity;
//			})
			
			
			return total
		}
	},
	methods:{
		
	},
	components:{
		
	}
}
</script>

<style scoped>
.shopcart{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 48px;
	z-index: 50px;
}
.shopcart .content{
	display: flex;
	background-color:#141d27;
	font-size: 0;
	color: rgba(255,255,255,0.4);
}
.content-left{
	flex: 1;
}
.content-left .logo-wrapper{
	display: inline-block;
	vertical-align: top;
	position: relative;
	top: -10px;
	padding: 6px;
	margin: 0 12px;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	box-sizing: border-box;
	background-color: #141d27;
}
.content-left .logo-wrapper .logo{
	width: 44px;
	height: 44px;
	border-radius: 50%;
	text-align: center;
	background-color: #2b343c;
}
.content-left .logo-wrapper .icon-shopping_cart{
	font-size: 24px;
	line-height: 44px;
}

.content-left .price,.content-left .desc{
	display: inline-block;
	vertical-align: top;
	margin-top: 12px;
	font-size: 10px;
	line-height: 24px;
}
.content-left .price{
	margin-right: 12px;
	padding-right: 12px;
	font-size: 16px;
	font-weight: 700;
	border-right: 1px solid rgba(255,255,255,0.1);
}

.content-right{
	flex: 0 0 105px;
	width: 105px;
}
.content-right .pay{
	height: 48px;
	padding: 12px 8px 0 8px;
	text-align: center;
	font-size: 12px;
	line-height: 24px;
	font-weight: 700;
	background-color: #2b343c;
}
</style>