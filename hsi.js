;(function(context){
	PI = Math.PI;
	function cos(deg){
		return Math.cos(deg / 180 * PI);
	}
	function rgb2hsi(R,G,B){
	var r,g,b,h,s,i;
		r = R/255;
		g = G/255;
		b = B/255;
		i = (r+g+b)/3;
		
		if (R==G && G==B){s=0; h=0;}
		else {
		w = (r-g+r-b) / Math.sqrt((r-g)*(r-g)+(r-b)*(g-b))/2;
			h = Math.acos(w) * 180 / PI;
			if(b>g) h= 360-h;
			s=1-Math.min(r,g,b)/i;
		}
		return [h, s, i];
	}

	function hsi2rgb(h,s,i){
		var r,g,b,z,x;
		z=(1-s)/3;
		function x(h){return (1+s*cos(h)/cos(60-h))/3;}
		if(h<0)return [0,0,0];
		else if(h<=120){
			b=z;
			r=x(h);
			g=1-r-b;
		}
		else if(h<=240){
			g=x(h-120);
			r=z;
			b=1-r-g;
		}
		else if(h<=360){
			b=x(h-240);
			g=z;
			r=1-g-b;
		}
		else {r=g=b=0;}

		return [Math.floor(i*r*765), Math.floor(i*g*765), Math.floor(i*b*765)];
	}


	context['toRGB'] = function(h,s,i){
		if(h instanceof Array){
			return hsi2rgb(h[0], h[1], h[2]);
		}
		return hsi2rgb(h,s,i);
	};

	context['toHSI'] = function(r,g,b){
		if(r instanceof Array){
			return rgb2hsi(r[0], r[1], r[2]);
		}
		else if(r instanceof String && r.indexOf('rgb') === 0){ //rgb(1,2,3)
			sp = r.replace(/rgb(a?)\(|\)|\s/gi, '').split(',');
			return rgb2hsi(sp[0], sp[1], sp[2]);
		}
		else if(r instanceof String && r.indexOf('#') === 0){ //#123355
			rgb = r.slice(1);
			if(rgb.length === 3){
				rgb=rgb.replace(/([a-f0-9])/gi, '$1$1');
			}
			return rgb2hsi(parseInt(rgb.substring(0,2),16),
					parseInt(rgb.substring(2,4),16),
					parseInt(rgb.substring(4,6),16));
		}
		return rgb2hsi(r,g,b);
	};

})(this);
