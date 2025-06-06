document.addEventListener('DOMContentLoaded', () => {

    const bundleOptions = document.querySelectorAll('.bundle-option');
    const totalAmountDisplay = document.querySelector('.total-amount');

    const bundlePrices = {
        '1pair': 195.00,
        '2pair': 345.00,
        '3pair': 528.00
    };

    const updateTotalPrice = (value) => {
        const newTotal = bundlePrices[value] || 0;
        if (totalAmountDisplay) {
            totalAmountDisplay.textContent = `DKK ${newTotal.toFixed(2)}`;
        }
    };

    const selectBundle = (selectedOption) => {
        bundleOptions.forEach(option => {
            const content = option.querySelector('.option-content');
            const radio = option.querySelector('input[type="radio"]');

            if (option === selectedOption) {
                option.classList.add('selected');
                content?.classList.add('expanded');
                if (radio && !radio.checked) radio.checked = true;
            } else {
                option.classList.remove('selected');
                content?.classList.remove('expanded');
                if (radio && radio.checked) radio.checked = false;
            }
        });
        updateTotalPrice(selectedOption.querySelector('input[type="radio"]').value);
    };


    const initialCheckedRadio = document.querySelector('input[name="bundle"]:checked');
    if (initialCheckedRadio) {
        selectBundle(initialCheckedRadio.closest('.bundle-option'));
    } else {
        const firstOption = bundleOptions[0];
        if (firstOption) {
            firstOption.querySelector('input[type="radio"]').checked = true;
            selectBundle(firstOption);
        }
    }


    bundleOptions.forEach(option => {
        const radioInput = option.querySelector('input[type="radio"]');
        radioInput.addEventListener('change', () => {
            if (radioInput.checked) {
                selectBundle(option);
            }
        });

        option.querySelectorAll('.size-select, .color-select').forEach(select => {
            select.addEventListener('change', (event) => {
                const itemNumber = event.target.closest('.item-row')?.querySelector('.item-number')?.textContent || 'Unknown Item';
                const type = event.target.classList.contains('size-select') ? 'Size' : 'Color';
                console.log(`Bundle Option ${option.id}, Item ${itemNumber}: ${type} changed to ${event.target.value}`);
            });
        });
    });

    document.querySelector('.add-to-cart-btn')?.addEventListener('click', () => {
        const selectedBundleRadio = document.querySelector('input[name="bundle"]:checked');

        if (selectedBundleRadio) {
            const selectedBundle = selectedBundleRadio.closest('.bundle-option');
            const bundleValue = selectedBundleRadio.value;
            const itemSelections = [];

            selectedBundle.querySelectorAll('.option-content.expanded .item-row').forEach(row => {
                itemSelections.push({
                    item: row.querySelector('.item-number')?.textContent,
                    size: row.querySelector('.size-select')?.value,
                    color: row.querySelector('.color-select')?.value
                });
            });

            console.log('Adding to cart:', {
                bundle: bundleValue,
                id: selectedBundle.id,
                items: itemSelections
            });
            alert(`Added ${bundleValue} to cart! Total: ${totalAmountDisplay.textContent}`);
        } else {
            alert('Please select a bundle option first!');
        }
    });
});