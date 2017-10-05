normal = ["`1234567890-=".split(''),
    "qwertyuiop[]\\".split(''),
    "asdfghjkl;’".split(''),
    "zxcvbnm,./".split('')
]

shift = ["~!@#$%^&*()_+".split(''),
    "QWERTYUIOP{}|".split(''),
    "ASDFGHJKL:\"".split(''),
    "ZXCVBNM<>?".split('')
]

option = ["`¡™£¢∞§¶•ªº–≠".split(''),
    "Œ∑´®†¥¨ˆøπ“‘«".split(''),
    "Åß∂ƒ©˙∆˚¬…æ".split(''),
    "Ω≈ç√∫˜µ≤≥÷".split('')
]
shiftOption = ["`⁄€‹›ﬁﬂ‡°·‚—±".split(''),
    "Œ„´‰ˇÁ¨ˆØ∏”’»".split(''),
    "ÅÍÎÏ˝ÓÔÒÚÆ".split(''),
    "¸˛Ç◊ı˜Â¯˘¿".split('')
]

STATE_NORMAL = 0
STATE_SHIFT = 0x1
STATE_OPTION = 0x2
STATE_SHIFT_OPTION = STATE_OPTION | STATE_SHIFT

state_chars_map = []
state_chars_map[STATE_NORMAL] = normal
state_chars_map[STATE_SHIFT] = shift
state_chars_map[STATE_SHIFT_OPTION] = shiftOption
state_chars_map[STATE_OPTION] = option

var vue = new Vue({
    el: '#keyboard',
    data: {
        keyState: STATE_NORMAL,
        chars: state_chars_map[STATE_NORMAL],
        shiftKey: false,
        optionKey: false
    }
});

function update() {
    vue.chars = state_chars_map[vue.keyState];
    vue.shiftKey = vue.keyState & STATE_SHIFT
    vue.optionKey = vue.keyState & STATE_OPTION
}

document.addEventListener('keyup', function(e) {
    console.log(e);
    if (e.key == 'Alt') {
        vue.keyState ^= STATE_OPTION
        clearInterval(timer)
    } else if (e.key == 'Shift') {
        vue.keyState ^= STATE_SHIFT
        clearInterval(timer)
    }
    update()
})

timer = setInterval(function () {
    vue.keyState = (vue.keyState + 1) % 0x4;
    update()
}, 5000)