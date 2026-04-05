// ===== COUNTDOWN =====
const TARGET = new Date('2026-04-24T16:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = TARGET - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '🍺';
        document.getElementById('hours').textContent = 'UŽ';
        document.getElementById('minutes').textContent = 'TO';
        document.getElementById('seconds').textContent = 'BĚŽÍ';
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = d;
    document.getElementById('hours').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== MOBILE NAV =====
document.querySelector('.nav-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('open');
    });
});

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation based on sibling index
                const siblings = entry.target.parentElement.children;
                const idx = Array.from(siblings).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

handleScrollAnimations();

// ===== PARTICIPANTS =====
const participants = [
    {
        name: 'Eda',
        nickname: 'Pán domu',
        emoji: '🏠',
        clan: 'Rodina Machalova',
        quote: '„Vítejte u mě doma. Zouvejte se."',
        isAdult: true,
    },
    {
        name: 'Jiří',
        nickname: 'Přiženěný',
        emoji: '💍',
        clan: 'Rodina Machalova',
        quote: '„Machruju, jako by to bylo moje. Přitom jsem to de facto jen vyženil."',
        isAdult: true,
    },
    {
        name: 'Kryštof',
        nickname: 'Vrchní výčepní',
        emoji: '🍺',
        clan: 'Rodina Machalova',
        quote: '„Objednávky přijímám, ale reklamace ne."',
        isAdult: false,
    },
    {
        name: 'Luboš',
        nickname: 'Stálice',
        emoji: '🎸',
        clan: '',
        quote: '„Přijdu. Víc neřeším."',
        isAdult: true,
    },
    {
        name: 'Zorka',
        nickname: 'Samozvaná vrchní velitelka dětského oddílu',
        emoji: '✨',
        clan: '',
        quote: '„Jsem sice taky dítě, ale velím všem."',
        isAdult: false,
    },
    {
        name: 'Meda',
        nickname: 'Medvěd(ka)',
        emoji: '🐻',
        clan: '',
        quote: '„Kdo jde pro dřevo? Ne já, ale fandím."',
        isAdult: true,
    },
    {
        name: 'Alda',
        nickname: 'Tichá voda',
        emoji: '🦅',
        clan: 'Filipenští',
        quote: '„Nemluvím moc. O to víc piju."',
        isAdult: true,
    },
    {
        name: 'Meda F.',
        nickname: 'Vyhlášený jedlík zájezdu',
        emoji: '🍽️',
        clan: 'Filipenští',
        quote: '„Co se bude jíst? A kdy? A kolikrát?"',
        isAdult: false,
    },
    {
        name: 'Paulas velký',
        nickname: 'Věž',
        emoji: '🏔️',
        clan: 'Paulasovi',
        quote: '„Jsem tu. Není třeba víc."',
        isAdult: true,
    },
    {
        name: 'Paulas malý',
        nickname: 'Věžička',
        emoji: '🏕️',
        clan: 'Paulasovi',
        quote: '„Malý, ale hlasitý."',
        isAdult: false,
    },
    {
        name: 'Ivšák',
        nickname: 'Boss',
        emoji: '🔥',
        clan: 'Famiglia Rozesral',
        quote: '„To příjmení je dědictví, ne hodnocení akce."',
        isAdult: true,
    },
    {
        name: 'Filípek',
        nickname: 'Blesk',
        emoji: '⚡',
        clan: 'Famiglia Rozesral',
        quote: '„Kde je akce?"',
        isAdult: false,
    },
    {
        name: 'Daník',
        nickname: 'Stratég',
        emoji: '🎯',
        clan: 'Famiglia Rozesral',
        quote: '„Bude pizza? Tak jo."',
        isAdult: false,
    },
];

const grid = document.getElementById('participantsGrid');

participants.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'participant-card';
    card.innerHTML = `
        <div class="participant-avatar">${p.emoji}</div>
        <div class="participant-name">${p.name}</div>
        <div class="participant-role">${p.nickname}${p.clan ? ' · ' + p.clan : ''}</div>
    `;
    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
});

// ===== MODAL =====
const overlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openModal(p) {
    document.getElementById('modalAvatar').textContent = p.emoji;
    document.getElementById('modalName').textContent = p.name;
    document.getElementById('modalNickname').textContent = p.nickname;
    document.getElementById('modalSubtitle').textContent = p.clan || '';
    document.getElementById('modalQuote').textContent = p.quote;
    overlay.classList.add('active');
}

function closeModal() {
    overlay.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== BEER VOTING =====
const beers = [
    {
        id: 'pilsner',
        name: 'Plzeň z Rohlíku',
        desc: 'Klasika, doručení až na chatu.',
        emoji: '🍺',
    },
    {
        id: 'policka',
        name: 'Polička ze Žďáru',
        desc: 'Lokální volba pro znalce.',
        emoji: '🍻',
    },
    {
        id: 'surprise',
        name: 'Někdo něco odněkud',
        desc: 'Překvapení. Žijeme na hraně.',
        emoji: '🎲',
    },
];

function getVotes() {
    try {
        return JSON.parse(localStorage.getItem('apalucha-beer-votes') || '{}');
    } catch {
        return {};
    }
}

function getUserVote() {
    return localStorage.getItem('apalucha-beer-user-vote') || null;
}

function saveVote(beerId) {
    const votes = getVotes();
    const prev = getUserVote();

    if (prev && votes[prev]) {
        votes[prev] = Math.max(0, votes[prev] - 1);
    }

    votes[beerId] = (votes[beerId] || 0) + 1;
    localStorage.setItem('apalucha-beer-votes', JSON.stringify(votes));
    localStorage.setItem('apalucha-beer-user-vote', beerId);
    renderBeers();
}

function renderBeers() {
    const beerGrid = document.getElementById('beerGrid');
    const votes = getVotes();
    const userVote = getUserVote();

    beerGrid.innerHTML = '';

    beers.forEach(beer => {
        const count = votes[beer.id] || 0;
        const isVoted = userVote === beer.id;
        const card = document.createElement('div');
        card.className = 'beer-card';
        card.innerHTML = `
            <div class="beer-emoji">${beer.emoji}</div>
            <div class="beer-name">${beer.name}</div>
            <div class="beer-desc">${beer.desc}</div>
            <div class="beer-votes">${count} ${count === 1 ? 'hlas' : count >= 2 && count <= 4 ? 'hlasy' : 'hlasů'}</div>
            <button class="beer-btn" ${isVoted ? 'disabled' : ''}>
                ${isVoted ? '✓ Tvůj hlas' : 'Hlasovat'}
            </button>
        `;
        card.querySelector('.beer-btn').addEventListener('click', () => {
            if (!isVoted) saveVote(beer.id);
        });
        beerGrid.appendChild(card);
    });

    // Re-observe for scroll animations
    handleScrollAnimations();
}

renderBeers();

// ===== BEER COUNTER =====
window.calculateBeerEstimate = function() {
    const adults = participants.filter(p => p.isAdult).length;
    const kids = participants.filter(p => !p.isAdult).length;
    const days = 1.5; // pátek večer + sobota
    const juicesPerKidPerDay = 3;

    const totalBeers = 88;
    const totalJuices = Math.round(kids * juicesPerKidPerDay * days);

    const counterEl = document.getElementById('beerEstimate');
    const breakdownEl = document.getElementById('beerBreakdown');

    // Animate counter
    let current = 0;
    const step = Math.ceil(totalBeers / 40);
    const interval = setInterval(() => {
        current += step;
        if (current >= totalBeers) {
            current = totalBeers;
            clearInterval(interval);
        }
        counterEl.textContent = current;
    }, 30);

    breakdownEl.innerHTML = `
        ${adults} dospělých × ${days} dní × kolik to dá<br>
        + ${totalJuices} džusů pro ${kids} dětí<br>
        <strong style="color: var(--warm);">= hodně.</strong>
    `;
}

// Run beer counter when section becomes visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            calculateBeerEstimate();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const counterSection = document.getElementById('beercounter');
if (counterSection) {
    counterObserver.observe(counterSection);
    // Fallback: run after short delay if observer doesn't fire
    setTimeout(() => {
        if (document.getElementById('beerEstimate').textContent === '0') {
            calculateBeerEstimate();
        }
    }, 2000);
}
