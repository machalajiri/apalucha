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

// ===== PARTICIPANTS =====
const participants = [
    {
        name: 'Eda',
        nickname: 'Pán domu',
        emoji: '🏠',
        clan: 'Rodina Machalova',
        quote: '„Vítejte u mě doma. Zouvejte se."',
    },
    {
        name: 'Jiří',
        nickname: 'Přiženěný',
        emoji: '💍',
        clan: 'Rodina Machalova',
        quote: '„Machruju, jako by to bylo moje. Přitom jsem se de facto jen dobře oženil."',
    },
    {
        name: 'Kryštof',
        nickname: 'Vrchní výčepní',
        emoji: '🍺',
        clan: 'Rodina Machalova',
        quote: '„Objednávky přijímám, ale reklamace ne."',
    },
    {
        name: 'Luboš',
        nickname: 'Stálice',
        emoji: '🎸',
        clan: '',
        quote: '„Přijdu. Víc neřeším."',
    },
    {
        name: 'Zorka',
        nickname: 'Samozvaná vrchní velitelka dětského oddílu',
        emoji: '✨',
        clan: '',
        quote: '„Jsem sice taky dítě, ale velím všem."',
    },
    {
        name: 'Meda',
        nickname: 'Medvěd(ka)',
        emoji: '🐻',
        clan: '',
        quote: '„Kdo jde pro dřevo? Ne já, ale fandím."',
    },
    {
        name: 'Alda',
        nickname: 'Tichá voda',
        emoji: '🦅',
        clan: 'Filipenští',
        quote: '„Nemluvím moc. O to víc piju."',
    },
    {
        name: 'Meda F.',
        nickname: 'Vyhlášený jedlík zájezdu',
        emoji: '🍽️',
        clan: 'Filipenští',
        quote: '„Co se bude jíst? A kdy? A kolikrát?"',
    },
    {
        name: 'Paulas velký',
        nickname: 'Věž',
        emoji: '🏔️',
        clan: 'Paulasovi',
        quote: '„Jsem tu. Není třeba víc."',
    },
    {
        name: 'Paulas malý',
        nickname: 'Věžička',
        emoji: '🏕️',
        clan: 'Paulasovi',
        quote: '„Malý, ale hlasitý."',
    },
    {
        name: 'Ivšák',
        nickname: 'Boss',
        emoji: '🔥',
        clan: 'Famiglia Rozesral',
        quote: '„To příjmení je dědictví, ne hodnocení akce."',
    },
    {
        name: 'Filípek',
        nickname: 'Blesk',
        emoji: '⚡',
        clan: 'Famiglia Rozesral',
        quote: '„Kde je akce?"',
    },
    {
        name: 'Daník',
        nickname: 'Stratég',
        emoji: '🎯',
        clan: 'Famiglia Rozesral',
        quote: '„Bude pizza? Tak jo."',
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
}

renderBeers();
