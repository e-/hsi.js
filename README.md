hsi.js is a small javascript library which converts HSI and RGB to each other.

## Examples

### Conversion from RGB to HSI

<pre><code>
	hsi = toHSI(255, 0, 0); // [0, 1, 0.3333]
</code></pre>

you can use various RGB formats.
<pre><code>
	hsi1 = toHSI(255, 0, 0);

	hsi2 = toHSI([255, 0, 0]);
	hsi3 = toHSI('#FF0000');
	hsi4 = toHSI('#ff0000');
	hsi5 = toHSI('rgb(255,0,0)');	

	// all results will be the same. [0, 1, 0.3333]
</code></pre>

### Conversion from HSI to RGB

<pre><code>
	rgb1 = toRGB(0, 1, 0.3333); // [255, 0, 0]
	rgb2 = toRGB([0, 1, 0.3333]); // [255, 0, 0]

	pink = toRGB(300, 1, 0.6666); // [255, 0, 255]
</code></pre>

### Other Usages

you can generate colors using HSI features.

<pre><code>
	//generate pastel-tone color.
	pastel = toRGB(Math.floor(Math.random() * 360), 0.3, 1); 

	//generate vivid color.
	vivid = toRGB(Math.floor(Math.random() * 360), 1, 1);
</code></pre>

## Tested Environments

- Safari
- Google Chrome 
- Internet Explorer 6+
- FireFox

## Licences
### GPL
hsi.js (HSI <-> RGB conversion javascript library)
Copyright (C) 2011-2015 Jaemin Jo

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
