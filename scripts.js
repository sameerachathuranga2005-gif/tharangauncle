        // 1. Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        function toggleMobileMenu() {
            mobileMenu.classList.toggle('hidden');
        }
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close mobile menu on clicking any navigation link
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // 2. Sticky Navbar Visual Elevation
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 40) {
                navbar.classList.add('shadow-md');
                navbar.classList.replace('bg-white/90', 'bg-white/98');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.replace('bg-white/98', 'bg-white/90');
            }
        });

        // 3. Product Catalog Category Filtering & RFQ Linking
        function filterProducts(category) {
            // Update active tab buttons based on data-cat attribute
            const buttons = document.querySelectorAll('.product-tab-btn');
            buttons.forEach(btn => {
                if (btn.dataset.cat === category) {
                    btn.classList.remove('bg-gray-100', 'text-gray-700');
                    btn.classList.add('bg-gle-600', 'text-white', 'shadow-md');
                } else {
                    btn.classList.remove('bg-gle-600', 'text-white', 'shadow-md');
                    btn.classList.add('bg-gray-100', 'text-gray-700');
                }
            });

            // Filter items in the product grid
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Smooth scroll to product grid if triggered from category showcase above
            const filterTabs = document.getElementById('productFilterTabs');
            if (filterTabs && window.scrollY < filterTabs.offsetTop - 250) {
                filterTabs.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Helper: Request Quotation pre-selects RFQ form and smoothly scrolls to contact section
        function requestProductQuote(categoryName, productName) {
            const quoteProductSelect = document.getElementById('quoteProduct');
            if (quoteProductSelect) {
                const targetCat = categoryName.toLowerCase();
                for (let i = 0; i < quoteProductSelect.options.length; i++) {
                    const optText = quoteProductSelect.options[i].text.toLowerCase();
                    const optVal = quoteProductSelect.options[i].value.toLowerCase();
                    if (optText.includes(targetCat) || optVal.includes(targetCat) || targetCat.includes(optVal)) {
                        quoteProductSelect.selectedIndex = i;
                        break;
                    }
                }
            }

            const messageField = document.getElementById('quoteMessage');
            if (messageField && productName) {
                messageField.value = `Inquiry regarding ${productName} (${categoryName} range). Please provide wholesale quotation, minimum order quantities, and available sizes.`;
            }

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const nameInput = document.getElementById('quoteName');
                    if (nameInput) nameInput.focus();
                }, 600);
            }
        }

        // 4. Interactive Film Calculator Logic
        function updateWeightLabel(val) {
            document.getElementById('calcWeightLabel').innerText = val + ' kg';
        }

        function calculateRecommendation() {
            const app = document.getElementById('calcApp').value;
            const method = document.querySelector('input[name="calcMethod"]:checked').value;
            const weight = parseInt(document.getElementById('calcWeight').value);

            let gauge = '20 Micron';
            let filmType = 'High-Grade Manual Stretch Film';
            let desc = 'Balanced puncture resistance and reliable elastic holding.';
            let width = '500 mm';
            let yieldStr = '200% - 250%';
            let strap = '12mm PP Strap + PP Clips';

            if (app === 'coir-rubber') {
                if (weight > 800) {
                    gauge = '25 - 30 Micron';
                    filmType = 'Ultra Heavy-Duty Compressible Wrap';
                    desc = 'Engineered specifically for coir peat bricks and rubber bales that expand or exert high outward tensile thrust.';
                    strap = '15mm - 18mm PP Strap + Steel Seals';
                    yieldStr = '280% - 320%';
                } else {
                    gauge = '23 Micron';
                    filmType = 'Heavy-Duty Coir & Baling Film';
                    desc = 'Excellent elastic memory, locking compressed materials against moisture and expansion.';
                    strap = '15mm PP Strap + PP Clips';
                }
            } else if (app === 'parts-bundling') {
                gauge = '17 - 20 Micron';
                filmType = 'Mini Bundling Stretch Film (Baby Roll)';
                desc = 'Ideal for bundling loose tubes, pipes, timber and multi-carton batches cleanly with zero glue residue.';
                width = '100mm / 150mm';
                yieldStr = '150% - 200%';
                strap = '9mm - 12mm PP Strap';
            } else if (app === 'agricultural') {
                gauge = '25 - 35 Micron';
                filmType = 'Agricultural Silage & Barrier Film (UV Protected)';
                desc = 'Co-extruded multi-layer film with 12-month tropical UV inhibitors for outdoor agricultural storage.';
                width = '500mm / 750mm';
                yieldStr = '250%';
                strap = '15mm Heavy PP Strap';
            } else {
                // standard or heavy pallet
                if (method === 'machine') {
                    if (weight > 1000) {
                        gauge = '23 - 30 Micron';
                        filmType = 'Power Pre-Stretch Machine Film';
                        desc = 'Maximum load retention for high-speed turntable wrapper machines handling heavy export pallets.';
                        yieldStr = 'Up to 320%';
                        strap = '15mm Machine-Grade PP Strap';
                    } else {
                        gauge = '20 Micron';
                        filmType = 'Standard Pre-Stretch Machine Roll';
                        desc = 'High-yield stretch film reducing packaging cost per pallet by up to 35%.';
                        yieldStr = '250%';
                        strap = '12mm PP Strap';
                    }
                } else {
                    // manual
                    if (weight > 1000) {
                        gauge = '23 Micron';
                        filmType = 'Extra Heavy Manual Hand Wrap';
                        desc = 'Maximum puncture resistance against sharp wooden pallets and heavy metal cartons.';
                        strap = '15mm PP Strap + PP Clips';
                    } else {
                        gauge = '17 - 20 Micron';
                        filmType = 'Standard Hand Stretch Film';
                        desc = 'Lightweight, ergonomic rolls for fast factory floor wrapping without worker fatigue.';
                        strap = '12mm PP Strap + PP Clips';
                    }
                }
            }

            document.getElementById('recGauge').innerText = gauge;
            document.getElementById('recFilmType').innerText = filmType;
            document.getElementById('recDesc').innerText = desc;
            document.getElementById('recWidth').innerText = width;
            document.getElementById('recYield').innerText = yieldStr;
            document.getElementById('recStrap').innerText = strap;

            const waText = encodeURIComponent(`Hello GLE! Based on your packaging calculator for a ${weight}kg load, I am interested in: ${gauge} ${filmType} (${width}). Please provide quotation.`);
            document.getElementById('recWhatsAppBtn').href = `https://wa.me/94773248520?text=${waText}`;
        }

        // 5. Product Specification Modal Data
        const productSpecs = {
            'stretch-film': {
                title: 'High-Grade Pallet Stretch Film (Hand & Machine)',
                image: './assets/cat-stretch-film.jpg',
                subtitle: 'Linear Low Density Polyethylene (LLDPE) • Virgin Grade',
                description: 'Our flagship stretch film is engineered for secure wrapping, load stability, and safe transport. It preserves goods against moisture, humidity, dust, and physical transit vibration.',
                category: 'Stretch Film',
                specs: [
                    ['Polymer Base', '100% Virgin LLDPE'],
                    ['Thickness Options', '15μm, 17μm, 20μm, 23μm, 25μm, 30μm'],
                    ['Standard Width', '500 mm (Custom 100mm to 750mm)'],
                    ['Stretch Elongation', 'Up to 300% Pre-stretch'],
                    ['Cling Characteristic', 'Smooth non-tacky outer, high cling inner'],
                    ['Puncture Resistance', 'ASTM D1709 Compliant Testing'],
                    ['Recyclability', '100% Recyclable Category 4 (LDPE)'],
                    ['Availability', 'In Stock • Available from GLE (Direct Factory Supply)']
                ]
            },
            'mini-bundling': {
                title: 'Mini Bundling Stretch Film Rolls (Baby Film)',
                image: './assets/mini-bundling-rolls.jpg',
                subtitle: 'Extended Core & Hand Dispenser Compatible',
                description: 'Engineered for swift grouping of items that previously required tapes. Does not leave sticky glue markings on furniture, chrome pipes, or retail packaging.',
                category: 'Stretch Film',
                specs: [
                    ['Available Widths', '100 mm (4 Inch) & 150 mm (6 Inch)'],
                    ['Micron Range', '17 Micron, 20 Micron, 23 Micron'],
                    ['Core Type', 'Ergonomic Extended Core or Standard 1.5 Inch'],
                    ['Packaging Unit', '24 or 36 Rolls per corrugated master carton'],
                    ['Best For', 'Pipes, timber rods, wire reels, grouping carton packs'],
                    ['Availability', 'Available from GLE']
                ]
            },
            'aluminium-packaging': {
                title: 'Aluminium Food Containers & Heavy-Duty Foil Rolls',
                image: './assets/cat-aluminium.jpg',
                subtitle: 'Food-Grade Aluminium Foil • Oven, Grill & Freezer Safe',
                description: 'Certified food-grade aluminium packaging providing superior barrier against light, moisture, and odors. Perfect for takeaway restaurants, caterers, and bakeries requiring leak-proof and heat-retaining containers.',
                category: 'Aluminium Packaging',
                specs: [
                    ['Product Types', 'Rectangular Food Containers, Round Foil Bowls, Foil Rolls'],
                    ['Available Sizes', 'Multiple options & capacities with cardboard/foil lids'],
                    ['Temperature Range', '-40°C Freezer to +280°C Conventional Oven Safe'],
                    ['Material Grade', 'Pure High-Purity Food Contact Aluminium'],
                    ['Application', 'Hot & cold takeaway meals, biryani, pasta, lasagna, baking'],
                    ['Availability', 'Available from GLE (Wholesale Master Cartons)']
                ]
            },
            'catering-packaging': {
                title: 'Commercial Catering & Food Service Essentials',
                image: './assets/cat-catering.jpg',
                subtitle: 'Professional Kitchen & Bakery Grade Packaging Range',
                description: 'Complete range of catering supplies essential for busy restaurants, clouds kitchens, caterers, and bakeries. Formulated for food safety, hygiene, and efficiency.',
                category: 'Catering Products',
                specs: [
                    ['Catalogue Items', 'Baking Paper, Piping Bags, Cake Boards, Straws, Chef Hats'],
                    ['Food Packaging', 'Pizza Boxes, Zipper Bags, Food Vacuum Bags, Cling Film'],
                    ['Hygiene & Service', 'Food Service Gloves, Toothpicks, Chopsticks, Disposable Cutlery'],
                    ['Available Sizes', 'Multiple commercial sizes and wholesale pack options'],
                    ['Compliance', 'Certified Food Contact Safe & Non-Toxic'],
                    ['Availability', 'Available from GLE (Direct Wholesale Supply)']
                ]
            },
            'ecofriendly-packaging': {
                title: 'EcoWare Boxes & Sugarcane Bagasse Trays',
                image: './assets/cat-ecofriendly.jpg',
                subtitle: '100% Biodegradable & Compostable Plant-Fiber Packaging',
                description: 'Sustainably sourced natural sugarcane bagasse tableware that decomposes naturally within 90 days. Heat-tolerant, oil-resistant, and free from plastic linings or PFAS.',
                category: 'Eco-Friendly Packaging',
                specs: [
                    ['Products Included', 'EcoWare Boxes, Multi-compartment Bagasse Trays, Eco Bowls, Cups & Lids'],
                    ['Material Origin', '100% Upcycled Sugarcane Fiber (Bagasse)'],
                    ['Thermal Rating', 'Microwave safe up to 120°C, Freezer safe to -20°C'],
                    ['Oil Resistance', 'Waterproof and grease-resistant without chemical wax'],
                    ['Biodegradability', '100% Home and Industrial Compostable'],
                    ['Availability', 'Available from GLE']
                ]
            },
            'paper-packaging': {
                title: 'Bakery Paper Packaging & Insulated Cups',
                image: './assets/cat-paper.jpg',
                subtitle: 'Confectionery, Bakery & Cafe Packaging Range',
                description: 'Aesthetic, food-safe paper packaging designed to elevate bakery and confectionery display while ensuring freshness during transit.',
                category: 'Paper Products',
                specs: [
                    ['Products Included', 'Decorative Doilies, Cupcake Liners, Window Cake Boxes, Paper Cups'],
                    ['Paper Quality', 'Virgin Food-Grade Bleached and Kraft Board'],
                    ['Cup Capacities', '4oz, 6oz, 8oz, 12oz, 16oz single & double wall with lids'],
                    ['Liners & Doilies', 'Greaseproof fluted liners & lace round/oval doilies'],
                    ['Application', 'Bakery display, cafe takeaway, patisseries, banquet service'],
                    ['Availability', 'Available from GLE']
                ]
            },
            'plastic-packaging': {
                title: 'Food-Grade Plastic Packaging & HIPS Containers',
                image: './assets/cat-plastic.jpg',
                subtitle: 'Clear Beverage Cups, Sauce Tubs & Rigid HIPS Meal Trays',
                description: 'Durable, crystal-clear plastic packaging for beverages and salads, alongside high-impact polystyrene (HIPS) rigid meal trays and secure portion cups.',
                category: 'Plastic Products',
                specs: [
                    ['Products Included', 'Drinking Cups & Lids, Sauce Containers, Plastic Trays, HIPS Containers'],
                    ['Polymers', 'Food-Grade Polypropylene (PP), PET & High-Impact Polystyrene (HIPS)'],
                    ['Lid Options', 'Leak-proof Flat Lids, Dome Lids with Straw Holes, Snap Lids'],
                    ['Available Sizes', '1oz to 32oz capacities; 1, 2, 3, 4 compartment meal trays'],
                    ['Clarity & Strength', 'High transparency, crack resistant & leak-proof seal'],
                    ['Availability', 'Available from GLE']
                ]
            },
            'wooden-packaging': {
                title: 'Natural Wooden & Bamboo Catering Products',
                image: './assets/cat-wooden.jpg',
                subtitle: 'Smooth Polished Bamboo Skewers, Boat Trays & Cutlery',
                description: 'Sustainably harvested bamboo skewers, cocktail knot skewers, paddle skewers, rustic wooden boat trays, and disposable wooden cutlery for dining and events.',
                category: 'Wooden Products',
                specs: [
                    ['Products Included', 'BBQ Sticks, Knot Skewers, Looper Skewers, Paddle Skewers, Wooden Boats, Wooden Cups'],
                    ['Material', '100% Natural Bamboo & Birch Wood (Chemical Free)'],
                    ['Finish', 'Machine-polished, splinter-free, heat-resistant for grilling'],
                    ['Sizes Available', '10cm to 30cm skewer lengths, varied boat tray volumes'],
                    ['Application', 'BBQ grilling, satay, cocktail appetizers, finger food catering'],
                    ['Availability', 'Available from GLE']
                ]
            },
            'kraft-packaging': {
                title: 'Natural Brown Kraft Paper Containers & Bags',
                image: './assets/cat-kraft.jpg',
                subtitle: 'Unbleached Natural Kraft Takeaway Boxes & Pouch Bags',
                description: 'Earthy, modern kraft paper containers featuring grease-resistant PE/PLA interior coatings, fold-lock lunch boxes, stand-up pouch bags, and sturdy carry bags.',
                category: 'Kraft Packaging',
                specs: [
                    ['Products Included', 'Kraft Containers, SHA Boxes, Cake Cup Boxes, Lunch Boxes, Pouch Bags, Kraft Trays, Paper Bags'],
                    ['Board Material', 'High-burst strength Virgin Brown Kraft Paperboard'],
                    ['Lining', 'Food-grade moisture and oil-resistant inner lining'],
                    ['Formats', 'Fold-top lunch cartons, window bakery boxes, stand-up zip pouches'],
                    ['Handle Bags', 'Twisted paper handles with reinforced bottom base'],
                    ['Availability', 'Available from GLE']
                ]
            },
            'pp-strapping': {
                title: 'Polypropylene (PP) Strapping Bands',
                image: './assets/pp-strapping-circle.jpg',
                subtitle: 'Manual Hand Tools & Power Machine Strappers',
                description: 'High tensile strength polypropylene bands designed for bundling and carton closure. Features diamond embossing to minimize tool tensioning slippage.',
                category: 'Other Packaging',
                specs: [
                    ['Width Range', '5mm, 9mm, 12mm, 15mm, 18mm'],
                    ['Tensile Strength', 'Up to 280 kg/f depending on width'],
                    ['Surface Finish', 'Diamond Embossed Anti-Slip'],
                    ['Color Choices', 'Blue, Yellow, Red, Green, White, Black'],
                    ['Custom Printing', 'Company logo & trade name printed to order'],
                    ['Core Dimensions', '200mm standard machine core or cardboard reel'],
                    ['Availability', 'Available from GLE (In Stock)']
                ]
            },
            'strapping-clips': {
                title: 'Strapping Clips & Seals (PP Plastic & Steel)',
                image: './assets/plastic-clips-square.jpg',
                subtitle: 'Tool-Free PP Buckles & High-Shear Steel Crimp Seals',
                description: 'Eco-friendly PP Plastic Clips can be applied manually without any tensioning tools and are recycled directly together with the strap. Heavy Steel Seals provide permanent crimp hold.',
                category: 'Other Packaging',
                specs: [
                    ['Plastic Clip Material', '100% Polypropylene (Recycles with PP Strap)'],
                    ['Steel Seal Material', 'High-Grade Galvanized Steel'],
                    ['Sizes Available', '12mm, 15mm, 19mm Widths'],
                    ['Advantage of Plastic', 'Zero sharp edges, non-scratch, zero rust'],
                    ['Advantage of Steel', 'Extreme shear resistance for heavy export pallets'],
                    ['Availability', 'Available from GLE']
                ]
            },
            'machine-stretch': {
                title: 'Power Pre-Stretch Machine Rolls',
                image: './assets/pallet-stretch-rolls.jpg',
                subtitle: 'Automated Turntable & Rotary Wrapping Lines',
                description: 'Engineered for high-volume automated lines. Consistent gauge profile ensures zero web-breakage down-time and maximum wrapping cost efficiency.',
                category: 'Stretch Film',
                specs: [
                    ['Pre-Stretch Rating', '250% – 320% Yield'],
                    ['Roll Weight', '12 kg to 16 kg Rolls'],
                    ['Micron Gauges', '20μm, 23μm, 29μm, 35μm'],
                    ['Core Size', '3 Inch (76mm) Heavy Paper Core'],
                    ['Pallet Unitization', 'Extreme holding for container export'],
                    ['Availability', 'Available from GLE (Direct Factory Supply)']
                ]
            },
            'silage-film': {
                title: 'Agricultural Silage & Barrier Film',
                image: './assets/eco-sustainability.jpg',
                subtitle: '12-Month UV Stabilized Agricultural Grade',
                description: 'Multi-layer blown film technology with specialized UV stabilizers designed for tropical climates. Creates a hermetic seal against oxygen and moisture.',
                category: 'Other Packaging',
                specs: [
                    ['UV Resistance', 'Minimum 12 Months Tropical Sunlight Rating'],
                    ['Thickness', '25 Micron to 35 Micron'],
                    ['Available Colors', 'White (Heat Reflective), Green, Black'],
                    ['Applications', 'Forage, silage bales, outdoor construction covers'],
                    ['Availability', 'Available from GLE']
                ]
            }
        };

        function openProductModal(key) {
            const data = productSpecs[key];
            if (!data) return;

            let specsHtml = data.specs.map(s => `
                <tr class="border-b border-gray-100">
                    <td class="py-2.5 text-xs font-bold text-gray-700 w-1/3">${s[0]}</td>
                    <td class="py-2.5 text-xs text-gray-600">${s[1]}</td>
                </tr>
            `).join('');

            document.getElementById('modalContent').innerHTML = `
                <div class="flex flex-col sm:flex-row items-start gap-4 mb-6">
                    <img src="${data.image}" alt="${data.title}" class="w-full sm:w-32 h-32 object-cover bg-gray-50 rounded-2xl border p-1 shadow-sm">
                    <div class="flex-1">
                        <span class="text-[11px] font-bold text-gle-700 bg-gle-50 px-2.5 py-1 rounded-full uppercase tracking-wider">GLE Product Specification Sheet</span>
                        <h3 class="text-xl font-bold text-gray-900 mt-1">${data.title}</h3>
                        <p class="text-xs text-gray-500 font-medium mt-0.5">${data.subtitle}</p>
                    </div>
                </div>
                <p class="text-xs text-gray-600 leading-relaxed mb-6">${data.description}</p>
                <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6">
                    <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Technical Parameters & Overview</h4>
                    <table class="w-full text-left">
                        <tbody>${specsHtml}</tbody>
                    </table>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <button onclick="closeProductModal(); requestProductQuote('${data.category || 'Packaging'}', '${data.title}');" class="flex-1 py-3 px-4 rounded-xl bg-gle-600 hover:bg-gle-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-sm">
                        <i class="fa-solid fa-file-invoice"></i>
                        <span>Request a Quotation</span>
                    </button>
                    <a href="https://wa.me/94773248520?text=I%20would%20like%20a%20quotation%20for%20${encodeURIComponent(data.title)}" target="_blank" class="py-3 px-4 rounded-xl bg-gle-50 text-gle-700 hover:bg-gle-600 hover:text-white font-bold text-xs text-center flex items-center justify-center gap-2 transition-colors">
                        <i class="fa-brands fa-whatsapp text-sm"></i>
                        <span>WhatsApp RFQ</span>
                    </a>
                    <button onclick="closeProductModal()" class="py-3 px-5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs">
                        Close
                    </button>
                </div>
            `;

            document.getElementById('productDetailModal').classList.remove('hidden');
            document.getElementById('productDetailModal').classList.add('flex');
        }

        function closeProductModal() {
            document.getElementById('productDetailModal').classList.add('hidden');
            document.getElementById('productDetailModal').classList.remove('flex');
        }

        // 6. Universal Modern Toast Notification System
        function showToast(message, type = 'success') {
            let container = document.getElementById('toastContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toastContainer';
                container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none';
                document.body.appendChild(container);
            }

            const toast = document.createElement('div');
            const isWarning = type === 'warning';
            toast.className = `pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
                isWarning 
                    ? 'border-amber-300 bg-amber-50/95 text-amber-950 backdrop-blur-md' 
                    : 'border-emerald-500/30 bg-white/95 text-slate-900 backdrop-blur-md shadow-emerald-500/10'
            }`;

            const iconClass = isWarning ? 'fa-triangle-exclamation text-amber-500' : 'fa-circle-check text-emerald-500';

            toast.innerHTML = `
                <div class="w-8 h-8 rounded-xl ${isWarning ? 'bg-amber-100' : 'bg-emerald-100'} flex items-center justify-center flex-shrink-0 text-sm">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-bold leading-snug">${message}</p>
                </div>
                <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-gray-600 text-xs p-1">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;

            container.appendChild(toast);

            requestAnimationFrame(() => {
                toast.classList.remove('translate-y-4', 'opacity-0');
                toast.classList.add('translate-y-0', 'opacity-100');
            });

            setTimeout(() => {
                toast.classList.remove('opacity-100', 'translate-y-0');
                toast.classList.add('opacity-0', 'translate-y-4');
                setTimeout(() => toast.remove(), 300);
            }, 4500);
        }

        // 7. Executive WhatsApp RFQ Quotation Formatter
        function sendQuoteToWhatsApp(isDirect = false) {
            const nameInput = document.getElementById('quoteName');
            const companyInput = document.getElementById('quoteCompany');
            const phoneInput = document.getElementById('quotePhone');
            const emailInput = document.getElementById('quoteEmail');
            const productSelect = document.getElementById('quoteProduct');
            const volumeSelect = document.getElementById('quoteVolume');
            const messageInput = document.getElementById('quoteMessage');

            const name = (nameInput ? nameInput.value : '').trim();
            const company = (companyInput ? companyInput.value : '').trim();
            const phone = (phoneInput ? phoneInput.value : '').trim();
            const email = (emailInput && emailInput.value.trim()) ? emailInput.value.trim() : 'Not Provided';
            const product = productSelect ? productSelect.options[productSelect.selectedIndex].text : 'Stretch Film & Packaging';
            const volume = volumeSelect ? volumeSelect.options[volumeSelect.selectedIndex].text : 'Initial Commercial Batch';
            const notes = (messageInput && messageInput.value.trim()) ? messageInput.value.trim() : 'Please provide wholesale quotation, minimum order quantities (MOQ), and delivery schedule.';

            // Validation with smooth focus
            if (!name) {
                showToast('Please enter your Full Name', 'warning');
                if (nameInput) nameInput.focus();
                return;
            }
            if (!company) {
                showToast('Please enter your Company / Business Name', 'warning');
                if (companyInput) companyInput.focus();
                return;
            }
            if (!phone) {
                showToast('Please enter your Phone / WhatsApp Number', 'warning');
                if (phoneInput) phoneInput.focus();
                return;
            }

            // Current date and time formatting
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            const inquiryType = isDirect ? 'DIRECT WHATSAPP INQUIRY' : 'OFFICIAL QUOTATION REQUEST (RFQ)';

            // Cleanly formatted WhatsApp Message with bolding, sections, and emojis
            const formattedMessage = 
`━━━━━━━━━━━━━━━━━━━━━
🟢 *GREEN LIGHT ENTERPRISES*
📋 *${inquiryType}*
━━━━━━━━━━━━━━━━━━━━━

👤 *CLIENT INFORMATION*
• *Full Name:* ${name}
• *Company / Business:* ${company}
• *Phone / WhatsApp:* ${phone}
• *Email:* ${email}

📦 *PRODUCT REQUIREMENTS*
• *Selected Product:* ${product}
• *Estimated Monthly Volume:* ${volume}

📍 *DELIVERY & SPECIAL INSTRUCTIONS*
${notes}

━━━━━━━━━━━━━━━━━━━━━
🏭 *Manufacturer:* Green Light Enterprises
📍 *Factory:* 3/9A, Rita Lane, Wewala, Ja-Ela, Sri Lanka
📞 *Hotline:* +94 77 324 8520 / 011 224 4746
🌐 *Sent via:* Official Web Portal
⏰ *Timestamp:* ${dateStr} at ${timeStr}
━━━━━━━━━━━━━━━━━━━━━`;

            const encodedMsg = encodeURIComponent(formattedMessage);
            const waUrl = `https://wa.me/94773248520?text=${encodedMsg}`;

            // Open WhatsApp in new tab/app
            window.open(waUrl, '_blank');

            // Show Toast feedback
            showToast(`Quotation formatted! Opening WhatsApp for ${name}...`, 'success');

            // Show persistent inline fallback banner below form
            const banner = document.getElementById('quoteSuccessBanner');
            const waBtn = document.getElementById('quoteSuccessWaBtn');
            if (banner && waBtn) {
                waBtn.href = waUrl;
                banner.classList.remove('hidden');
                banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        function handleQuoteSubmit(e) {
            if (e) e.preventDefault();
            sendQuoteToWhatsApp(false);
        }

        function sendViaWhatsAppDirect() {
            sendQuoteToWhatsApp(true);
        }

        // 9. 3D Tilt Card Vanilla Effect
        const tiltCards = document.querySelectorAll('.tilt-card-container');
        tiltCards.forEach(container => {
            const card = container.querySelector('.tilt-card');
            if (!card) return;

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            container.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
                card.style.transition = `transform 0.5s ease`;
                setTimeout(() => {
                    card.style.transition = `transform 0.1s ease-out`;
                }, 500);
            });

            container.addEventListener('mouseenter', () => {
                card.style.transition = `transform 0.1s ease-out`;
            });
        });

        // Initialize calculator on page load
        calculateRecommendation();

        // 10. Luxury Welcome Splash Screen / Intro Handler
        function initWelcomeSplash() {
            const splash = document.getElementById('welcomeSplash');
            if (!splash) return;

            const progressBar = document.getElementById('splashProgressBar');
            const statusText = document.getElementById('splashStatusText');

            let progress = 0;
            const duration = 2100; // 2.1 seconds total intro
            const intervalTime = 25;
            const step = 100 / (duration / intervalTime);

            const timer = setInterval(() => {
                progress += step;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(timer);
                    if (progressBar) progressBar.style.width = '100%';
                    if (statusText) statusText.innerText = 'WELCOME TO GREEN LIGHT ENTERPRISES';

                    setTimeout(() => {
                        dismissWelcomeSplash();
                    }, 300);
                } else {
                    if (progressBar) progressBar.style.width = `${progress}%`;
                    if (statusText) {
                        if (progress < 30) {
                            statusText.innerText = 'CONNECTING TO FACTORY NETWORK...';
                        } else if (progress < 65) {
                            statusText.innerText = 'LOADING PACKAGING CATALOG...';
                        } else if (progress < 90) {
                            statusText.innerText = 'OPTIMIZING LOAD SECURITY DATA...';
                        } else {
                            statusText.innerText = 'EXPERIENCE READY';
                        }
                    }
                }
            }, intervalTime);

            // Clicking outside dismisses early
            splash.addEventListener('click', (e) => {
                if (e.target.closest('button')) return;
                clearInterval(timer);
                dismissWelcomeSplash();
            });
        }

        function dismissWelcomeSplash() {
            const splash = document.getElementById('welcomeSplash');
            if (!splash || splash.classList.contains('dismissed')) return;
            splash.classList.add('dismissed');

            splash.style.opacity = '0';
            splash.style.transform = 'scale(1.05)';
            splash.style.pointerEvents = 'none';

            setTimeout(() => {
                splash.remove();
            }, 800);
        }

        // Initialize welcome splash on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initWelcomeSplash);
        } else {
            initWelcomeSplash();
        }

