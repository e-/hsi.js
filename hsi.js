/**
 * hsi.js HSI <-> RGB Conversion library
 * https://github.com/e-/hsi.js
 *
 * Copyright 2011-2015, Jaemin Jo
 * under the GPL Version 3 license.
 */

;(function(context) {
	PI = Math.PI;
	/**
	 * Return cosine value of given deg
	 *
	 * @param (Number) deg degree
	 * @returns (Number) The cosine value of given degree
 	 */
	function cos(deg) {
		return Math.cos(deg / 180 * PI);
	}

	/**
	 * Converts RGB to an array containing its HSI values
	 *
	 * @param (Number) R The value of R (0 <= R <= 255) 
	 * @param (Number) G The value of G (0 <= G <= 255)
	 * @param (Number) B The value of B (0 <= B <= 255)
	 * @returns (Array) The array containing the HSI values
	 */
	function rgb2hsi(R, G, B) {
		var r, g, b, h, s, i;
		r = R / 255;
		g = G / 255;
		b = B / 255;
		i = (r + g + b) / 3;
		
		if (R == G && G == B){
			s = h = 0;
		}
		else {
			w = (r - g + r - b) / Math.sqrt((r - g) * (r - g) + (r - b) * (g - b)) / 2;
			h = Math.acos(w) * 180 / PI;

			if (b > g)
				h = 360 - h;

			s = 1 - Math.min(r, g, b) / i;
		}

		return [h, s, i];
	}

	/**
	 * Converts HSI to an array containing its RGB values
	 *
	 * @param (Number) h The value of H (0 <= H <= 360)
	 * @param (Number) s The value of S (0 <= S <= 1)
	 * @param (Number) i The value of I (0 <= I <= 1)
	 * @returns (Array) The array containing the RGB values
	 */
	function hsi2rgb(h, s, i) {
		var r, g, b, z, x;
		z = (1 - s) /3;

		function x(h) {
			return (1 + s * cos(h) / cos(60 - h)) / 3;
		}

		if (h < 0) {
			return [0, 0, 0];
		}
		else if (h <= 120) {
			b = z;
			r = x(h);
			g = 1 - r - b;
		}
		else if (h <= 240) {
			g = x(h - 120);
			r = z;
			b = 1 - r - g;
		}
		else if (h <= 360) {
			b = x(h - 240);
			g = z;
			r= 1 - g - b;
		}
		else {
			r = g = b = 0;
		}

		/* normalize RGB */
		return [Math.round(i * r * 765), Math.round(i * g * 765), Math.round(i * b * 765)];
	}

	/**
	 * Converts an array of HSI values or a HSI value to an array containing its RGB values
	 * 
	 * @param (Number|Array) h An array of HSI values or the value of H (0 <= H <= 360)
	 * @param (Number) s The value of S (0 <= S <= 1)
	 * @param (Number) i The value of I (0 <= I <= 1)
	 * @returns (Array) The array containing the RGB values
	 */
	context.toRGB = function(h, s, i) {
		if (h instanceof Array) {
			// toRGB([240, 0.5, 0])
			return hsi2rgb(h[0], h[1], h[2]);
		}

		return hsi2rgb(h, s, i);
		// toRGB(240, 0.5, 0)
	};

	/**
	 * Converts an array of RGB values, a RGB string starting with 'rgb', a 6 digit hexadecimal string or an RGB value to array containing its HSI values
	 * 
	 * @param (Number|Array|String) r An array([128,128,0]), a rgb string('rgb(128,128,0)'), a 6 digit hexadecimal string('#808000') or the value of Red (0 <= r <= 255)
	 * @param (Number) g The value of Green (0 <= g <= 255)
	 * @param (Number) b The value of Blue (0 <= b <= 255)
	 * @returns (Array) The array containing the HSI values
	 */
	context.toHSI = function(r,g,b) {
		if (r instanceof Array) {
			// toHSI([128, 128, 0])
			return rgb2hsi(r[0], r[1], r[2]);
		}
		else if (typeof r == "string" && r.indexOf('rgb') == 0) {
			// toHSI('rgb(128,128,0)') or toHSI('rgba(128,128,0,0.5'))
			sp = r.replace(/rgb(a?)\(|\)|\s/gi, '').split(',');
			return rgb2hsi(sp[0], sp[1], sp[2]);
		}
		else if (typeof r == "string"  && r.indexOf('#') == 0) {
			// toHSI('#808000')

			// Take off '#'
			rgb = r.slice(1);

			// if the given code is shorthand, convert it. ex) #eee -> #eeeeee 
			if (rgb.length == 3)
				rgb = rgb.replace(/([a-f0-9])/gi, '$1$1');

			// extract r, g, b values and convert.
			return rgb2hsi(
				parseInt(rgb.substring(0,2), 16),
				parseInt(rgb.substring(2,4), 16),
				parseInt(rgb.substring(4,6), 16)
			);
		}

		return rgb2hsi(r, g, b);
		// toHSI(128, 128, 0)
	};
})(this);
