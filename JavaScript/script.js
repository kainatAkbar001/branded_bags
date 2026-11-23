const bags=[
{id:1,name:'Noir Chain Shoulder Bag',cat:'shoulder',price:6490,tag:'BESTSELLER',img:'black-chain-shoulder-bag.jpg'},
{id:2,name:'Blush Pink Everyday Tote',cat:'tote',price:5890,tag:'NEW ARRIVAL',img:'pink-everyday-tote.jpg'},
{id:3,name:'Classic 3-Piece Tote Set',cat:'tote',price:7990,tag:'SET OF 3',img:'beige-black-3pc-tote-set.jpg'},
{id:4,name:'Ivory Gold Handle Bag',cat:'shoulder',price:6290,tag:'ELEGANT PICK',img:'ivory-gold-handle-bag.jpg'},
{id:5,name:'Sage Green Mini Bag',cat:'crossbody',price:4490,tag:'FRESH COLOUR',img:'sage-green-structured-bag.jpg'},
{id:6,name:'Blue Pattern Mini Bag',cat:'crossbody',price:5290,tag:'STATEMENT',img:'blue-patterned-mini-bag.jpg'},
{id:7,name:'Floral Embellished Clutch',cat:'occasion',price:4990,tag:'OCCASION',img:'floral-embellished-clutch.jpg'},
{id:8,name:'Black Embroidered Potli',cat:'occasion',price:3990,tag:'HAND DETAIL',img:'black-embroidered-potli.jpg'},
{id:9,name:'Teal Embroidered Clutch',cat:'occasion',price:4590,tag:'FESTIVE EDIT',img:'teal-embroidered-clutch.jpg'},
{id:10,name:'Powder Blue Hobo Bag',cat:'shoulder',price:5790,tag:'EVERYDAY',img:'blue-hobo-shoulder-bag.jpg'},
{id:11,name:'Lavender Classic Tote',cat:'tote',price:6190,tag:'SOFT TONE',img:'lavender-tote-bag.jpg'}
];
let active='all',cart=[],wishlist=new Set();
const $=id=>document.getElementById(id),money=n=>'Rs. '+n.toLocaleString('en-PK');
function render(){
 let list=bags.filter(b=>(active==='all'||b.cat===active)&&(b.name.toLowerCase().includes($('search').value.toLowerCase())));
 if($('sort').value==='low')list.sort((a,b)=>a.price-b.price);
 if($('sort').value==='high')list.sort((a,b)=>b.price-a.price);
 $('products').innerHTML=list.map(b=>`<article class="product-card"><div class="product-img"><img src="Images/${b.img}" alt="${b.name}" loading="lazy"><span class="tag">${b.tag}</span><button class="wish ${wishlist.has(b.id)?'selected':''}" data-wish="${b.id}" aria-label="Wishlist ${b.name}">♡</button><button class="add" data-add="${b.id}">ADD TO BAG +</button></div><div class="product-info"><h3>${b.name}</h3><div class="product-meta"><span>${b.cat==='occasion'?'Occasion bag':b.cat.charAt(0).toUpperCase()+b.cat.slice(1)+' bag'}</span><strong>${money(b.price)}</strong></div></div></article>`).join('');
 $('empty').hidden=list.length>0;
}
function notify(msg){$('toast').textContent=msg;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1800)}
function updateCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),sum=cart.reduce((s,x)=>s+x.qty*x.price,0);
 $('cartCount').textContent=count;$('cartItemsCount').textContent='('+count+')';$('subtotal').textContent=money(sum);
 $('cartContent').innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><img src="Images/${x.img}" alt=""><div><h4>${x.name}</h4><p>${money(x.price)} × ${x.qty}</p><button class="remove" data-remove="${x.id}">Remove</button></div></div>`).join(''):'<p class="cart-empty">Your bag is waiting for something beautiful.</p>';
}
function add(id){let b=bags.find(x=>x.id===id),item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...b,qty:1});updateCart();notify(b.name+' added to your bag');}
function showCart(){ $('cart').classList.add('visible');$('shade').classList.add('visible');}
function hideCart(){ $('cart').classList.remove('visible');$('shade').classList.remove('visible');}
$('filters').addEventListener('click',e=>{let b=e.target.closest('[data-cat]');if(!b)return;active=b.dataset.cat;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render();});
$('products').addEventListener('click',e=>{let a=e.target.closest('[data-add]'),w=e.target.closest('[data-wish]');if(a)add(+a.dataset.add);if(w){let id=+w.dataset.wish;wishlist.has(id)?wishlist.delete(id):wishlist.add(id);render();notify(wishlist.has(id)?'Added to your wishlist':'Removed from wishlist');}});
$('cartContent').addEventListener('click',e=>{let r=e.target.closest('[data-remove]');if(r){cart=cart.filter(x=>x.id!==+r.dataset.remove);updateCart();}});
$('search').addEventListener('input',render);$('sort').addEventListener('change',render);
$('openCart').addEventListener('click',showCart);$('closeCart').addEventListener('click',hideCart);$('shade').addEventListener('click',hideCart);
$('menuBtn').addEventListener('click',()=>$('nav').classList.toggle('open'));
$('focusSearch').addEventListener('click',()=>{$('shop').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('search').focus(),350);});
$('checkout').addEventListener('click',()=>{if(!cart.length){notify('Your shopping bag is empty');return;}let lines=cart.map(x=>`${x.name} x ${x.qty} - ${money(x.price*x.qty)}`).join('\n');let total=money(cart.reduce((s,x)=>s+x.price*x.qty,0));let msg=encodeURIComponent(`Hello KAINAT! I would like to order:\n${lines}\nTotal: ${total}`);window.open('https://wa.me/?text='+msg,'_blank');});
$('newsletter').addEventListener('submit',e=>{e.preventDefault();$('newsletterMsg').textContent='Thank you for joining the KAINAT style list!';$('email').value='';});
render();updateCart();
