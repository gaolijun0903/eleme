<template>
<div class="cartcontrol">
	<transition name="move">
		<div class="cart-decrease" v-show="food.quantity>0" @click.stop="decreaseCart($event)">
			<i class="icon-remove_circle_outline"></i>
		</div>
	</transition>
	<div class="cart-quantity" v-show="food.quantity>0">{{food.quantity}}</div>
	<div class="cart-add" @click.stop="addCart">
		<i class="icon-add_circle"></i>
	</div>
</div>
</template>

<script>
import Vue from "vue";
export default{
	props:{
		food:{
			type:Object
		}
	},
	methods:{
		addCart(ev){
			if(!ev._constructed){
				return
			}
			if(!this.food.quantity){
				Vue.set(this.food,'quantity',1);
			}else{
				this.food.quantity++;
			}
			this.$emit('cartadd',ev.target);
		},
		decreaseCart(ev){
			if(!ev._constructed){
				return
			}
			if(this.food.quantity<=0){
				return
			}
			this.food.quantity--;
			
		}
	}
}
</script>

<style>
.move-enter-active, .move-leave-active {
  transition: all .5s linear
}
.move-enter, .move-leave-to {
  opacity: 0;
  transform: translateX(24px) rotateZ(180deg);
}

.cartcontrol{
	font-size: 0;
}
.cartcontrol .cart-decrease,.cartcontrol .cart-add, .cartcontrol .cart-quantity{
	display: inline-block;
	vertical-align: middle;
	line-height: 24px;
}
.cartcontrol .cart-decrease, .cartcontrol .cart-add{	
	font-size: 24px;
	padding:6px;
	color:rgb(0,160,220);
}
.cartcontrol .cart-quantity{
	width: 12px;
	text-align: center;
	font-size: 10px;
	color:rgb(147,153,159);
}
</style>