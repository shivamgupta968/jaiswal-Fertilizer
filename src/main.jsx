import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Leaf, Sprout, Search, ShoppingBag, MapPin, Phone, ArrowRight, ShieldCheck, ChevronDown, Star, Menu, X, Plus, Minus, UserRound, Wheat, FlaskConical, Droplets, BadgeCheck, Truck, Heart, Check, LogOut, LocateFixed, MessageCircle, CreditCard, Wallet} from 'lucide-react';
import './styles.css';
const catalog=[
 {id:1,name:'IFFCO Urea',subtitle:'Nitrogen-rich • 45% N',price:'₹266',cost:266,image:'/images/3.png',tag:'Farmer favourite',category:'Fertilizers',description:'Supports lush vegetative growth and healthy crop development.'},
 {id:2,name:'DAP 18:46:0',subtitle:'Phosphorus powerhouse',price:'₹1,350',cost:1350,image:'/images/4.png',tag:'Best seller',category:'Fertilizers',description:'A trusted starter fertilizer for root development and early growth.'},
 {id:3,name:'NPK 19:19:19',subtitle:'Balanced • Water soluble',price:'₹1,450',cost:1450,image:'/images/5.png',tag:'All-round nutrition',category:'Fertilizers',description:'Balanced nutrition for a wide range of crops and growth stages.'},
 {id:4,name:'Zinc Sulphate',subtitle:'Micronutrient supplement',price:'₹320',cost:320,image:'/images/7.png',tag:'Micronutrient',category:'Crop Care',description:'Helps address zinc deficiency and supports healthy crop quality.'},
 {id:5,name:'Organic Vermicompost',subtitle:'Soil health • Natural',price:'₹280',cost:280,image:'https://images.unsplash.com/photo-1589923188900-85dae7b9e5c5?auto=format&fit=crop&w=900&q=85',tag:'Organic choice',category:'Organic',description:'Organic matter to improve soil structure and support soil life.'},
 {id:6,name:'Neem Cake',subtitle:'Natural soil amendment',price:'₹190',cost:190,image:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85',tag:'Eco-friendly',category:'Organic',description:'Neem-based amendment used in soil conditioning and crop care.'},
 {id:7,name:'MOP Potash',subtitle:'Potassium fertilizer • MOP',price:'₹600',cost:600,image:'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=85',tag:'Potassium support',category:'Fertilizers',description:'Potassium source for crop nutrition; use according to crop and soil recommendations.'},
 {id:8,name:'Humic Acid',subtitle:'Soil conditioner',price:'₹450',cost:450,image:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85',tag:'Soil care',category:'Crop Care',description:'Soil conditioner product; follow label directions.'},
 {id:9,name:'Seaweed Extract',subtitle:'Plant growth support',price:'₹380',cost:380,image:'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=85',tag:'Popular choice',category:'Crop Care',description:'Seaweed-based crop input; use as directed on the product label.'},
 {id:10,name:'Calcium Nitrate',subtitle:'Calcium + nitrogen',price:'₹750',cost:750,image:'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=85',tag:'Crop nutrition',category:'Fertilizers',description:'Calcium and nitrogen source; follow crop-specific recommendations.'},
 {id:11,name:'Sulphur 90%',subtitle:'Sulphur nutrition',price:'₹350',cost:350,image:'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=85',tag:'Soil nutrition',category:'Fertilizers',description:'Sulphur source for crop nutrition; use according to local recommendations.'},
 {id:12,name:'Bio Fertilizer',subtitle:'Beneficial soil microbes',price:'₹220',cost:220,image:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85',tag:'Bio option',category:'Organic',description:'Biofertilizer product; store and apply as instructed on its label.'},
];
const safeImages=[
'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=85',
'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=85',
'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=85',
'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85'
];
const galleryImages = Array.from({length:32},(_,i)=>`/images/fertilizer-${String(i+1).padStart(2,'0')}.jpg`);
function App(){
 const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('jf_user'))}catch{return null}});
 const [token,setToken]=useState(localStorage.getItem('jf_token')||'');
 const [name,setName]=useState(''),[mobile,setMobile]=useState(''),[error,setError]=useState('');
 const [query,setQuery]=useState(''),[category,setCategory]=useState('All'),[cart,setCart]=useState([]),[toast,setToast]=useState('');
 const [menu,setMenu]=useState(false);
 const [customerName,setCustomerName]=useState(()=>user?.name||'');
 const [customerMobile,setCustomerMobile]=useState(()=>user?.mobile||'');
 const [customerState,setCustomerState]=useState('Uttar Pradesh');
 const [customerDistrict,setCustomerDistrict]=useState('Jaunpur');
 const [customerAddress,setCustomerAddress]=useState('');
 const [payment,setPayment]=useState('COD');
 const [customerUpi,setCustomerUpi]=useState('');
 const [liveLocation,setLiveLocation]=useState('');
 const [locationMessage,setLocationMessage]=useState('');
 const [checkoutError,setCheckoutError]=useState('');
 const categories=['All','Fertilizers','Crop Care','Organic'];
 const productsShown=catalog.filter(p=>(category==='All'||p.category===category)&&(`${p.name} ${p.subtitle}`.toLowerCase().includes(query.toLowerCase())));
 async function login(e){e.preventDefault();setError('');try{const r=await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,mobile})});const d=await r.json();if(!r.ok)throw Error(d.message);localStorage.setItem('jf_token',d.token);localStorage.setItem('jf_user',JSON.stringify(d.user));setToken(d.token);setUser(d.user)}catch(err){setError(err.message||'Could not connect to server. Is it running?')}}
function logout(){localStorage.removeItem('jf_token');localStorage.removeItem('jf_user');setToken('');setUser(null);setCart([])}
 function add(p){setCart(c=>[...c,p]);setToast(`${p.name} added to your basket`);setTimeout(()=>setToast(''),2200)}
 function remove(id){setCart(c=>{const i=c.findIndex(p=>p.id===id);if(i<0)return c;return c.filter((_,j)=>j!==i)})}
 function cartQuantity(id){return cart.filter(p=>p.id===id).length}
 function decrease(id){remove(id)}
 const cartSubtotal=cart.reduce((sum,p)=>sum+(p.cost||0),0);
 function setCustomerLocation(){
   setLocationMessage('Allow location permission in your browser if prompted.');
   if(!navigator.geolocation){setLocationMessage('Location is not supported by this browser.');return;}
   navigator.geolocation.getCurrentPosition(pos=>{
     const coords=`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
     setLiveLocation(coords);
     setLocationMessage('Live location added to your order.');
   },()=>setLocationMessage('Could not access live location. You can enter your address manually.'),{enableHighAccuracy:true,timeout:12000});
 }
 function submitOrder(e){
   e.preventDefault();setCheckoutError('');
   if(!customerName.trim()||!/^\d{10}$/.test(customerMobile)||!customerAddress.trim()){
     setCheckoutError('Please enter your name, valid 10-digit mobile and complete delivery address.');return;
   }
   if(!cart.length){setCheckoutError('Your cart is empty. Add products before ordering.');return;}
   const rows=cart.reduce((a,p)=>{a[p.name]=(a[p.name]||0)+1;return a;},{});
   const lines=Object.entries(rows).map(([name,qty])=>`• ${name} × ${qty}`).join('\n');
   const msg=`JAISWAL FERTILIZER ORDER\n\nCustomer: ${customerName}\nMobile: +91 ${customerMobile}\nAddress: ${customerAddress}, ${customerDistrict}, ${customerState}\n${liveLocation?`Live location: ${liveLocation}\n`:''}\nItems:\n${lines}\n\nEstimated subtotal: ₹${cartSubtotal.toLocaleString('en-IN')}\nPayment: ${payment}${customerUpi?`\nCustomer UPI ID: ${customerUpi}`:''}\n\nPlease confirm availability, delivery charges and final total.`;
   window.open(`https://wa.me/919839532365?text=${encodeURIComponent(msg)}`,'_blank');
 }
 if(!user||!token)return <div className="auth-shell"><div className="auth-photo"><div className="photo-shade"></div><div className="brand brand-light"><span className="brand-icon"><Leaf size={22}/></span><span>JAISWAL <small>FERTILIZER</small></span></div><div className="hero-copy"><p className="eyebrow light">ROOTED IN TRUST. GROWING WITH YOU.</p><h1>Good soil.<br/>Great harvests.</h1><p>Quality crop nutrition and trusted guidance for every season.</p><div className="photo-pills"><span><Sprout size={15}/> Better crop care</span><span><BadgeCheck size={15}/> Trusted products</span></div></div><div className="photo-foot">Cultivating prosperity, one field at a time.</div></div><div className="auth-panel"><div className="auth-mobile-brand brand"><span className="brand-icon"><Leaf size={20}/></span><span>JAISWAL <small>FERTILIZER</small></span></div><div className="auth-card"><div className="auth-kicker"><span className="kicker-dot"></span> FARMER'S STORE</div><h2>Welcome to your farm store</h2><p className="muted">Enter your details to explore trusted crop care essentials.</p><form onSubmit={login}><label>Your name</label><div className="input-wrap"><UserRound size={18}/><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name" required/></div><label>Mobile number</label><div className="input-wrap"><span className="country">+91</span><input type="tel" maxLength="10" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number" required/></div><button className="primary full" type="submit">Continue <ArrowRight size={18}/></button></form>{error&&<div className="error">{error}</div>}<div className="secure-note"><ShieldCheck size={15}/> No OTP required · Quick access</div></div><div className="auth-bottom">Need help? <a href="tel:+919839532365">Call our team</a><span>•</span> Made for growers</div></div></div>
 return <div className="app"><header className="topbar"><div className="brand"><span className="brand-icon"><Leaf size={21}/></span><span>JAISWAL <small>FERTILIZER</small></span></div><nav className={menu?'nav open':'nav'}><a href="#home" onClick={()=>setMenu(false)}>Home</a><a href="#products" onClick={()=>setMenu(false)}>Products</a><a href="#about" onClick={()=>setMenu(false)}>About us</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a></nav><div className="top-actions"><button className="cart-btn" onClick={()=>document.getElementById('basket').scrollIntoView({behavior:'smooth'})}><ShoppingBag size={18}/><span>Basket</span><b>{cart.length}</b></button><button className="user-btn" onClick={logout}><span className="user-avatar">{user.name?.[0]?.toUpperCase()}</span><span className="user-name">{user.name.split(' ')[0]}</span><LogOut size={15}/></button><button className="hamb" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
 <main id="home"><section className="welcome-strip"><div><p className="eyebrow">YOUR FARM. YOUR FUTURE.</p><h1>Welcome back, {user.name.split(' ')[0]} <span>🌱</span></h1><p>Let's make this season your best harvest yet.</p></div><div className="welcome-chip"><Sprout/><span>Grow with confidence</span></div></section>
 <section className="hero-banner"><div className="hero-content"><span className="banner-tag">NOURISH • PROTECT • GROW</span><h2>Everything your<br/>crop needs to thrive.</h2><p>Thoughtfully selected essentials. Reliable quality.<br/>Support for every stage of your crop.</p><a href="#products" className="banner-cta">Explore products <ArrowRight size={16}/></a></div><div className="banner-art"><div className="sun"></div><div className="leaf-art leaf-one"></div><div className="leaf-art leaf-two"></div><div className="leaf-art leaf-three"></div><div className="banner-stat"><strong>Healthy roots</strong><span>Strong beginnings</span></div></div></section>
 <section className="trust-row"><div><span className="trust-icon"><BadgeCheck/></span><div><strong>Quality assured</strong><small>Products you can trust</small></div></div><div><span className="trust-icon"><Truck/></span><div><strong>Local support</strong><small>We're here to help</small></div></div><div><span className="trust-icon"><Wheat/></span><div><strong>Crop focused</strong><small>For every growing stage</small></div></div></section>
 <section className="products-section" id="products"><div className="section-heading"><div><p className="eyebrow">THE FARMER'S PICK</p><h2>Recommended for you</h2><p className="section-sub">Explore dependable products for a healthy, productive crop.</p></div><div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/></div></div><div className="filters">{categories.map(c=><button className={category===c?'filter active':'filter'} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="product-grid">{productsShown.map((p,i)=><article className="product-card" key={p.id}><div className="product-image"><img src={p.image} alt={p.name} onError={e=>e.currentTarget.src=safeImages[(p.id-1)%safeImages.length]}/><span className="product-tag">{p.tag}</span><button className="heart" onClick={e=>e.currentTarget.classList.toggle('liked')}><Heart size={17}/></button></div><div className="product-info"><span className="product-category">{p.category}</span><h3>{p.name}</h3><p>{p.subtitle}</p><div className="product-bottom"><div><strong>{p.price}</strong><small>Indicative price</small></div><button className="add-btn" onClick={()=>add(p)}><Plus size={17}/> Add</button></div></div></article>)}</div>{productsShown.length===0&&<div className="empty">No products match that search.</div>}</section>
  <section className="photo-gallery" id="gallery">
   <div className="section-heading">
     <div>
       <p className="eyebrow">OUR FERTILIZER COLLECTION</p>
       <h2>Fertilizer Photo Gallery</h2>
       <p className="section-sub">Explore our collection of fertilizer and agriculture product photos.</p>
     </div>
   </div>
   <div className="gallery-grid">
     {galleryImages.map((src,index)=><a className="gallery-photo" href={src} target="_blank" rel="noreferrer" key={src}>
       <img src={src} alt={`Fertilizer collection photo ${index+1}`} loading="lazy"/>
       <span>Photo {index+1}</span>
     </a>)}
   </div>
 </section>
 <section className="guidance" id="about"><div className="guidance-icon"><Sprout size={26}/></div><div><p className="eyebrow">A LITTLE GUIDANCE GOES A LONG WAY</p><h3>Not sure what your crop needs?</h3><p>Tell us your crop and its stage. Our team can help you choose the right products.</p></div><a href="#contact" className="outline-btn">Ask an expert <ArrowRight size={16}/></a></section>
 <section id="basket" className="basket"><div className="basket-heading"><div><p className="eyebrow">QUICK ORDER</p><h2>Your cart</h2><p className="section-sub">Add items, adjust quantity and send your order on WhatsApp.</p></div><span>{cart.length} item{cart.length===1?'':'s'}</span></div>
 {cart.length===0?<div className="basket-empty"><ShoppingBag size={24}/><p>Your cart is empty. Add products above to start your order.</p><a href="#products" className="outline-btn">Browse products <ArrowRight size={16}/></a></div>:<div className="checkout-layout">
 <div className="basket-list">{catalog.filter(p=>cart.some(c=>c.id===p.id)).map(p=><div className="basket-item" key={p.id}><img src={p.image} alt={p.name}/><div className="basket-product"><strong>{p.name}</strong><small>{p.subtitle}</small><b>₹{(p.cost||0).toLocaleString('en-IN')}</b></div><div className="qty-control"><button type="button" onClick={()=>decrease(p.id)} aria-label="Decrease quantity"><Minus size={15}/></button><span>{cartQuantity(p.id)}</span><button type="button" onClick={()=>add(p)} aria-label="Increase quantity"><Plus size={15}/></button></div></div>)}
 <div className="subtotal-row"><span>Item subtotal <small>Prices are indicative</small></span><strong>₹{cartSubtotal.toLocaleString('en-IN')}</strong></div><div className="subtotal-row"><span>Delivery charges</span><strong>To be confirmed</strong></div><div className="subtotal-row total-row"><span>Estimated total</span><strong>₹{cartSubtotal.toLocaleString('en-IN')}</strong></div>
 <div className="store-location"><MapPin size={20}/><div><strong>Store pickup / delivery point</strong><p>Bibiganj Bazaar, Main Market, near Union Bank of India, Jaunpur, Uttar Pradesh</p><a target="_blank" rel="noreferrer" href="https://maps.google.com/?q=Union+Bank+of+India+Bibiganj+Bazaar+Jaunpur+Uttar+Pradesh">Open location in Maps ↗</a></div></div>
 </div>
 <form className="checkout-form" onSubmit={submitOrder}><h3>Delivery details</h3><p className="form-note">Tell us where to deliver your order.</p>
 <label>Full name</label><input value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="Customer name" required/>
 <label>Mobile number</label><div className="checkout-phone"><span>+91</span><input type="tel" maxLength="10" value={customerMobile} onChange={e=>setCustomerMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit number" required/></div>
 <div className="address-grid"><div><label>State</label><input value={customerState} onChange={e=>setCustomerState(e.target.value)} required/></div><div><label>District</label><input value={customerDistrict} onChange={e=>setCustomerDistrict(e.target.value)} required/></div></div>
 <label>Complete delivery address</label><textarea value={customerAddress} onChange={e=>setCustomerAddress(e.target.value)} placeholder="House / village / landmark / pincode" rows="3" required/>
 <button className="location-btn" type="button" onClick={setCustomerLocation}><LocateFixed size={17}/> Use my live location</button>{locationMessage&&<p className="location-message">{locationMessage}</p>}{liveLocation&&<a className="live-map-link" target="_blank" rel="noreferrer" href={liveLocation}>View saved location on map ↗</a>}
 <label>Payment method</label><div className="payment-options"><button type="button" className={payment==='COD'?'payment-option selected':'payment-option'} onClick={()=>setPayment('COD')}><Wallet size={18}/> Cash on delivery</button><button type="button" className={payment==='UPI'?'payment-option selected':'payment-option'} onClick={()=>setPayment('UPI')}><CreditCard size={18}/> UPI</button></div>{payment==='UPI'&&<><label>Your UPI ID (optional)</label><input value={customerUpi} onChange={e=>setCustomerUpi(e.target.value)} placeholder="name@upi"/><p className="form-note">We will confirm the store's UPI details with you on WhatsApp before payment.</p></>}
 {checkoutError&&<p className="checkout-error">{checkoutError}</p>}<button className="primary full order-submit" type="submit"><MessageCircle size={18}/> Place order on WhatsApp</button><p className="whatsapp-note">Your order summary will open in WhatsApp to <strong>98395 32365</strong>. Order is confirmed only after the store replies.</p></form>
 </div>}
 </section>
 <section className="contact" id="contact"><div><p className="eyebrow">WE'RE HERE FOR YOUR FARM</p><h2>Let's grow together.</h2><p>Talk to our team about products, crop care, and availability.</p></div><div className="contact-actions"><a href="tel:+919839532365"><Phone size={17}/> Call store</a><a href="https://wa.me/919839532365" target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp</a><span><MapPin size={17}/> Bibiganj Bazaar Main Market, Jaunpur, Uttar Pradesh</span></div></section></main><footer><div className="brand"><span className="brand-icon"><Leaf size={18}/></span><span>JAISWAL <small>FERTILIZER</small></span></div><p>Growing trust. Growing harvests.</p><small>© 2026 Jaiswal Fertilizer. Demo storefront.</small></footer>{toast&&<div className="toast"><Check size={17}/>{toast}</div>}{cart.length>0&&<div className="sticky-cart"><div><strong>{cart.length} item{cart.length===1?'':'s'} in cart</strong><span>Estimated ₹{cartSubtotal.toLocaleString('en-IN')}</span></div><button onClick={()=>document.getElementById('basket').scrollIntoView({behavior:'smooth'})}>View cart <ArrowRight size={17}/></button></div>}</div>
}
createRoot(document.getElementById('root')).render(<App/>);

