export function applyEffect(target, effect) {

    if (!target.effects)
        target.effects = [];

    target.effects.push(effect);

}

export function processEffects(target) {

    if (!target.effects) return;

    target.effects.forEach(effect => {

        switch (effect.type) {

            case "poison":
                target.health -= 1;
                break;

            case "burn":
                target.health -= 2;
                break;

            case "stun":
                effect.skipTurn = true;
                break;

        }

        effect.duration--;

    });

    target.effects = target.effects
        .filter(e => e.duration > 0);

}