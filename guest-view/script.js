const dishes = [
    {
        title: "Croissant z kawą",
        description: "Maślany croissant podawany z aromatyczną kawą mleczną, idealny na lekki i elegancki początek dnia.",
        price: "38zł",
        image: "../assets/img-guest-view/sniadanie_1.png",
        categories: ["Polecane", "Śniadania"]
    },
    {
        title: "Jajka po benedyktyńsku",
        description: "Dwie połówki angielskiej muffiny z szynką, jajkami w koszulkach i aksamitnym sosem holenderskim.",
        price: "46zł",
        image: "../assets/img-guest-view/sniadanie_2.png",
        categories: ["Śniadania"]
    },
    {
        title: "Omlet z ziołami",
        description: "Delikatny omlet z dodatkiem świeżych ziół, podawany z lekką sałatą i świeżo wyciskanym sokiem.",
        price: "34zł",
        image: "../assets/img-guest-view/sniadanie_3.png",
        categories: ["Śniadania"]
    },
    {
        title: "Tost francuski z owocami",
        description: "Złocisty tost francuski z owocami leśnymi i subtelną nutą syropu, podawany na ciepło.",
        price: "39zł",
        image: "../assets/img-guest-view/sniadanie_4.png",
        categories: ["Śniadania"]
    },
    {
        title: "Jogurt z granolą i owocami",
        description: "Kremowy jogurt z chrupiącą granolą, miodem i świeżymi owocami, idealny dla osób wybierających lżejsze śniadanie.",
        price: "31zł",
        image: "../assets/img-guest-view/sniadanie_5.png",
        categories: ["Śniadania"]
    },
    {
        title: "Pancakes z owocami",
        description: "Puszyste pancakes z syropem klonowym i świeżymi owocami, serwowane w śniadaniowej odsłonie premium.",
        price: "42zł",
        image: "../assets/img-guest-view/sniadanie_6.png",
        categories: ["Śniadania"]
    },
    {
        title: "Makaron z owocami morza",
        description: "Tagliatelle z krewetkami, przegrzebkami i delikatnym sosem na bazie wytrawnego białego wina.",
        price: "89zł",
        image: "../assets/img-guest-view/obiad_1.png",
        categories: ["Polecane","Dania główne"]
    },
    {
        title: "Grillowany łosoś",
        description: "Soczysty filet z łososia podawany z warzywami sezonowymi i lekkim sosem cytrynowym.",
        price: "78zł",
        image: "../assets/img-guest-view/obiad_2.png",
        categories: ["Dania główne"]
    },
    {
        title: "Risotto z borowikami",
        description: "Kremowe risotto z borowikami, parmezanem i subtelną nutą oliwy truflowej.",
        price: "64zł",
        image: "../assets/img-guest-view/obiad_3.png",
        categories: ["Dania główne"]
    },
    {
        title: "Burger wołowy z frytkami",
        description: "Klasyczny burger z soczystą wołowiną, świeżymi dodatkami i chrupiącymi frytkami.",
        price: "56zł",
        image: "../assets/img-guest-view/obiad_4.png",
        categories: ["Dania główne"]
    },
    {
        title: "Filet wołowy z warzywami",
        description: "Delikatny filet wołowy serwowany z warzywami sezonowymi i eleganckim, ciemnym sosem.",
        price: "92zł",
        image: "../assets/img-guest-view/obiad_5.png",
        categories: ["Dania główne"]
    },
    {
        title: "Club sandwich z frytkami",
        description: "Klasyczny sandwich z kurczakiem, bekonem, sałatą i pomidorem, podawany z frytkami.",
        price: "52zł",
        image: "../assets/img-guest-view/obiad_6.png",
        categories: ["Dania główne"]
    },
    {
        title: "Tiramisu",
        description: "Klasyczny włoski deser z mascarpone, espresso i kakao, podawany schłodzony.",
        price: "44zł",
        image: "../assets/img-guest-view/deser_1.png",
        categories: ["Polecane","Desery"]
    },
    {
        title: "Fondant czekoladowy",
        description: "Ciepły fondant z płynnym środkiem, serwowany z delikatną gałką lodów waniliowych.",
        price: "42zł",
        image: "../assets/img-guest-view/deser_2.png",
        categories: ["Desery"]
    },
    {
        title: "Panna cotta waniliowa",
        description: "Delikatna panna cotta z wanilią i musem z owoców leśnych, lekka i elegancka w smaku.",
        price: "36zł",
        image: "../assets/img-guest-view/deser_3.png",
        categories: ["Desery"]
    },
    {
        title: "Tarta cytrynowa",
        description: "Krucha tarta z kremem cytrynowym i subtelną bezą, łącząca świeżość i słodycz.",
        price: "39zł",
        image: "../assets/img-guest-view/deser_4.png",
        categories: ["Desery"]
    },
    {
        title: "Sernik baskijski",
        description: "Kremowy sernik o karmelizowanym wierzchu, podawany w nowoczesnej odsłonie.",
        price: "41zł",
        image: "../assets/img-guest-view/deser_5.png",
        categories: ["Desery"]
    },
    {
        title: "Mus czekoladowy",
        description: "Lekki mus z gorzkiej czekolady, podawany z delikatną śmietanką i akcentem kakao.",
        price: "37zł",
        image: "../assets/img-guest-view/deser_6.png",
        categories: ["Desery"]
    },
    {
        title: "Aperol Spritz",
        description: "Klasyczny włoski aperitif na bazie Aperolu, prosecco i wody gazowanej, podawany z lodem oraz plasterkiem pomarańczy.",
        price: "34zł",
        image: "../assets/img-guest-view/napoj_1.png",
        categories: ["Polecane","Napoje"]
    },
    {
        title: "Sok pomarańczowy świeżo wyciskany",
        description: "Świeżo wyciskany sok z dojrzałych pomarańczy, podawany schłodzony.",
        price: "18zł",
        image: "../assets/img-guest-view/napoj_2.png",
        categories: ["Polecane", "Napoje"]
    },
    {
        title: "Cappuccino",
        description: "Włoska kawa mleczna z aksamitną pianką i delikatnym akcentem kakao.",
        price: "19zł",
        image: "../assets/img-guest-view/napoj_3.png",
        categories: ["Napoje"]
    },
    {
        title: "Espresso tonic",
        description: "Orzeźwiające połączenie espresso i toniku, podawane z lodem i plasterkiem cytrusa.",
        price: "24zł",
        image: "../assets/img-guest-view/napoj_4.png",
        categories: ["Napoje"]
    },
    {
        title: "Herbata premium",
        description: "Aromatyczna herbata liściasta serwowana w eleganckiej odsłonie, do wyboru kilka wariantów smakowych.",
        price: "17zł",
        image: "../assets/img-guest-view/napoj_5.png",
        categories: ["Napoje"]
    },
    {
        title: "Woda premium",
        description: "Butelkowana woda premium, niegazowana lub gazowana do wyboru.",
        price: "14zł",
        image: "../assets/img-guest-view/napoj_6.png",
        categories: ["Napoje"]
    }
];

let currentIndex = 0;
const cardsPerPage = 4;
let filteredDishes = [...dishes];

document.addEventListener("DOMContentLoaded", () => {
    const prevBtn = document.querySelector(".a-back");
    const nextBtn = document.querySelector(".a-forward");
    const dishCards = document.querySelectorAll(".dish-card");
    const categoryButtons = document.querySelectorAll(".categories-buttons-section button");
    const foodTitle = document.querySelector(".food-title-section-text");

    filteredDishes = dishes.filter(dish => dish.categories.includes("Polecane"));

    function updateCards() {
        dishCards.forEach((card, index) => {
            const dishIndex = currentIndex + index;
            if (dishIndex < filteredDishes.length) {
                const dish = filteredDishes[dishIndex];
                
                const imgDiv = card.querySelector(".dish-img");
                imgDiv.style.background = `url(${dish.image}) lightgray 0px -14px / 100% 147% no-repeat`;
                
                card.querySelector(".dish-card-title").textContent = dish.title;
                card.querySelector(".dish-card-text").textContent = dish.description;
                card.querySelector(".dish-card-action span").textContent = dish.price;
                
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            categoryButtons.forEach(b => {
                b.classList.remove("categorie-button-active");
                b.classList.add("categorie-button");
            });

            const clickedBtn = e.target;
            clickedBtn.classList.remove("categorie-button");
            clickedBtn.classList.add("categorie-button-active");

            const selectedCategory = clickedBtn.textContent.trim();
            filteredDishes = dishes.filter(dish => dish.categories.includes(selectedCategory));
            
            if (selectedCategory === "Polecane") {
                foodTitle.textContent = "Polecane pozycje";
            } else {
                foodTitle.textContent = selectedCategory;
            }
            
            currentIndex = 0;
            updateCards();
        });
        btn.style.cursor = "pointer";
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateCards();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex + cardsPerPage < filteredDishes.length) {
            currentIndex += 1;
            updateCards();
        }
    });

    prevBtn.style.cursor = "pointer";
    nextBtn.style.cursor = "pointer";

    updateCards();
});
