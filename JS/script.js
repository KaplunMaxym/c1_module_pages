window.addEventListener('load', ()=>{
    // global states
    let modileMenuActive = false;


    // forWhoAnimation 
    let forWhoCards = document.querySelectorAll('.forWhoCard');
    if(forWhoCards.length > 0){
        let forWhoRedLine = document.querySelector('.forWhoRedLine');
        let animanitionLineContainer = document.querySelector('.animanitionLineContainer');
        let activeCard = 0;
        let redLineWidth = forWhoRedLine.clientWidth;
        let containerLineWidth = animanitionLineContainer.clientWidth;
        forWhoRedLine.style.left = containerLineWidth * 0.09 + "px";
        setInterval(()=>{
            if(activeCard === 3){
                activeCard = 0;
            }
            forWhoCards.forEach(item => {
                item.classList.remove("activeForWhoCard");
            })
            forWhoCards[activeCard].classList.add('activeForWhoCard');
            if(activeCard === 0){
                forWhoRedLine.style.left = containerLineWidth * 0.09 + "px";
            }else if(activeCard === 1){
                forWhoRedLine.style.left = containerLineWidth / 2 - redLineWidth / 2 + "px";
            }else if(activeCard === 2){
                forWhoRedLine.style.left = containerLineWidth - (containerLineWidth * 0.09) - redLineWidth + "px";
            }
            activeCard++;
    
        }, 4000)
    }
    


    // acordain animation
    document.querySelectorAll('.questionCard').forEach(item => {
        item.addEventListener('click', (e)=>{
            e.stopPropagation()
            document.querySelectorAll('.questionCard').forEach(elem => {
                elem.querySelector('img').src = "img/plusIco.svg";
                elem.classList.remove('questionCardActive');
                elem.querySelector('.questionCardAnswer').classList.remove('questionCardAnswerActive');
            })
            console.log(item);

            item.classList.add('questionCardActive')
            item.querySelector('.questionCardAnswer').classList.add('questionCardAnswerActive');
            item.querySelector('img').src = "img/minusIco.svg";
        })
    })


    //mobile menu
    const mobileNavContainerBack = document.getElementById('mobileNavContainerBack');
    if(mobileNavContainerBack){
        const mobileNavContainer = document.getElementById('mobileNavContainer');
        const closeBtn = document.getElementById('closeBtn');
    
        document.getElementById('modileMenuBtn').addEventListener('click', ()=>{
            mobileNavContainerBack.style.display = 'block';
            mobileNavContainer.style.left = '0';
            modileMenuActive = true;
        })
        closeBtn.addEventListener('click', ()=>{
            mobileNavContainerBack.style.display = 'none';
            mobileNavContainer.style.left = '-100%';
            modileMenuActive = false;
        })
        mobileNavContainerBack.addEventListener('click', ()=>{
            mobileNavContainerBack.style.display = 'none';
            mobileNavContainer.style.left = '-100%';
            modileMenuActive = false;
        })
    }
    
    // scroll nav animation
    let linkBtn = document.querySelectorAll('[data-link]');
    linkBtn.forEach(item => {
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            console.log(item);
            const targetId = item.dataset.link;
            const targetElement = document.getElementById(targetId);
            if(modileMenuActive){
                mobileNavContainerBack.style.display = 'none';
                mobileNavContainer.style.left = '-100%';
                modileMenuActive = false;
            }
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            
        })
    })

    //password hide show animation
    document.querySelectorAll('[data-password-status]').forEach(item => {
        item.addEventListener('click', (e)=>{
            e.stopPropagation();
            const passwordInput = e.target.closest('.passwordInputContainer').querySelector('input[type="password"], input[type="text"]');                
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                e.target.dataset.passwordStatus = 'open';
                e.target.src = 'img/eyeOpen.svg';
            } else {
                passwordInput.type = 'password';
                e.target.dataset.passwordStatus = 'close';
                e.target.src = 'img/eyeClose.svg';
            }
        });
    });

    // custom select script
    let x, i, j, l, ll, selElmnt, a, b, c;
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            let y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
            }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
    }
    function closeAllSelect(elmnt) {
    let x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
        arrNo.push(i)
        } else {
        y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
        }
    }
    }
    document.addEventListener("click", closeAllSelect);

    // copy to clipbouar
    document.querySelectorAll('.keyContainer').forEach(container => {
        container.querySelector('[data-copy-type="key"]').addEventListener('click', () => {
            const key = container.querySelector('.key_area').dataset.copyData;
            navigator.clipboard.writeText(key).then(() => {
                let oldDaata = container.querySelector('[data-copy-type="key"]').innerHTML;
                container.querySelector('[data-copy-type="key"]').innerHTML = "Скопійовано !";
                setTimeout(()=>{
                    container.querySelector('[data-copy-type="key"]').innerHTML = oldDaata;
                }, 800)
            }).catch(err => {
                console.error('Failed to copy key: ', err);
            });
        });
    });
    
})