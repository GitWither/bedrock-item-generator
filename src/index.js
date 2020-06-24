let behaviorResult = document.getElementById("behavior-result");
let resourceResult = document.getElementById("resource-result");
let atlasResult = document.getElementById("texture-atlas-result");
let translationResult = document.getElementById("lang-result");

let itemSettings = document.getElementById("item-settings");
let blockSettings = document.getElementById("block-settings");

let flammableSettings = document.getElementById("flammable-settings");
let foodSettings = document.getElementById("food-settings")
let cropSettings = document.getElementById("crop-settings");

let type = document.getElementById("type");

let identifier = document.getElementById("identifier");
let translatedName = document.getElementById("translated-name")
let isExperimental = document.getElementById("is-experimental")
let texturePath = document.getElementById("texture-path");

//item settings
let itemCategory = document.getElementById("item-category");
let useAnimation = document.getElementById("use-animation");
let hoverTextColor = document.getElementById("hover-text-color");
let placesBlock = document.getElementById("places-block");
let foil = document.getElementById("enchant-glint");
let nutrition = document.getElementById("nutrition");
let canAlwaysEat = document.getElementById("can-always-eat");
let convertTo = document.getElementById("convert-to");
let saturationModifier = document.getElementById("saturation-modifier");
let useAction = document.getElementById("use-action");
let isHandEquipped = document.getElementById("is-hand-equipped");
let maxDamage = document.getElementById("max-damage");
let maxStackSize = document.getElementById("max-stack-size");
let cropId = document.getElementById("crop-id");
let stackedByData = document.getElementById("stacked-by-data");
let useDuration = document.getElementById("use-duration");

//block settings
let registerCreative = document.getElementById("register-creative");
let loottable = document.getElementById("loottable");
let destroyTime = document.getElementById("destroy-time");
let explosionResistance = document.getElementById("explosion-resistance");
let friction = document.getElementById("friction");
let flameOdds = document.getElementById("flame-odds");
let burnOdds = document.getElementById("burn-odds");
let mapColor = document.getElementById("map-color");
let lightAbsorption = document.getElementById("light-absorption");
let lightEmission = document.getElementById("light-emission");

let effectTemplate = document.getElementById("effect-template");
let effectsList = document.getElementById("effects-list");

let blockTemplate = document.getElementById("crop-block-template");
let blockList = document.getElementById("crop-blocks-list");

function showSettings() {
    if (type.options[type.selectedIndex].value === "item") {
        itemSettings.style = "dispaly: flex;"
        blockSettings.style = "display: none;"
    } else {
        blockSettings.style = "display: flex;"
        itemSettings.style = "display: none;"
    }
}

function addEffect() {
    let newEffect = effectTemplate.cloneNode(true);
    newEffect.style = "display: flex;";
    effectsList.append(newEffect);
    generate();
}

function deleteEffect(button) {
    button.parentElement.parentElement.remove();
    generate();
}

function cloneEffect(effect) {
    let newEffect = effect.parentElement.parentElement.cloneNode(true);
    newEffect.children[0].children[1].selectedIndex = effect.parentElement.parentElement.children[0].children[1].selectedIndex;
    effectsList.append(newEffect);
    generate();
}

function addBlock() {
    let newBlock = blockTemplate.cloneNode(true);
    newBlock.style = "display: flex;";
    blockList.append(newBlock);
    generate();
}

function deleteBlock(button) {
    button.parentElement.parentElement.remove();
    generate();
}

function cloneBlock(button) {
    let newBlock = button.parentElement.parentElement.cloneNode(true);
    blockList.append(newBlock);
    generate();
}

function updateFlammable() {
    if (document.getElementById("flammable").checked) {
        flammableSettings.style = "display: flex";
    } else {
        flammableSettings.style = "display: none;";
    }
    generate();
}

function updateFood() {
    if (document.getElementById("is-food").checked) {
        foodSettings.style = "display: flex;"
    } else {
        foodSettings.style = "display: none;"
    }
    generate();
}

function updateCrop() {
    if (document.getElementById("is-crop").checked) {
        cropSettings.style = "display: flex;"
    } else {
        cropSettings.style = "display: none;"
    }
    generate();
}

function generate() {
    if (type.options[type.selectedIndex].value === "item") {
        let behavior = {
            "format_version": "1.10",
            "minecraft:item": {
                "description": {
                    "identifier": identifier.value,
                    "is_experimental": isExperimental.checked
                },
                "components": {}
            }
        }
        if (placesBlock.value != "") {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:block": placesBlock.value
            }, behavior["minecraft:item"].components)
        }
        if (foil.checked) {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:foil": foil.checked
            }, behavior["minecraft:item"].components)
        }
        if (document.getElementById("is-food").checked) {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:food": {}
            }, behavior["minecraft:item"].components)
            if (nutrition.value != "") {
                behavior["minecraft:item"].components["minecraft:food"] = Object.assign({
                    "nutrition": parseInt(nutrition.value)
                }, behavior["minecraft:item"].components["minecraft:food"])
            }
            if (canAlwaysEat.checked) {
                behavior["minecraft:item"].components["minecraft:food"] = Object.assign({
                    "can_always_eat": canAlwaysEat.checked
                }, behavior["minecraft:item"].components["minecraft:food"])
            }
            if (convertTo.value != "") {
                behavior["minecraft:item"].components["minecraft:food"] = Object.assign({
                    "using_converts_to": convertTo.value
                }, behavior["minecraft:item"].components["minecraft:food"])
            }
            behavior["minecraft:item"].components["minecraft:food"] = Object.assign({
                "saturation_modifier": saturationModifier.options[saturationModifier.selectedIndex].value
            }, behavior["minecraft:item"].components["minecraft:food"])
            if (useAction.value != "") {
                behavior["minecraft:item"].components["minecraft:food"] = Object.assign({
                    "on_use_action": useAction.value
                }, behavior["minecraft:item"].components["minecraft:food"])
            }
            if (effectsList.childElementCount > 0) {
                let effects = [];
                for (let effect of effectsList.children) {
                    let name = effect.children[0].children[1].value;
                    let chance = parseFloat(effect.children[1].children[1].value);
                    let duration = parseFloat(effect.children[2].children[1].value);
                    let amplifier = parseFloat(effect.children[3].children[1].value)
                    effects.push({
                        "name": name, 
                        "chance": isNaN(chance) ? 0 : chance, 
                        "duration": isNaN(duration) ? 0 : duration, 
                        "amplifier": isNaN(amplifier) ? 0 : amplifier
                    })
                }
                behavior["minecraft:item"].components["minecraft:food"] = Object.assign({
                    "effects": effects
                }, behavior["minecraft:item"].components["minecraft:food"])
            }
        }
        if (isHandEquipped.checked) {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:hand_equipped": isHandEquipped.checked
            }, behavior["minecraft:item"].components)
        }
        if (maxDamage.value != "") {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:max_damage": parseInt(maxDamage.value)
            }, behavior["minecraft:item"].components)
        }
        if (maxStackSize.value != "") {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:max_stack_size": parseInt(maxStackSize.value)
            }, behavior["minecraft:item"].components)
        }
        if (document.getElementById("is-crop").checked) {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:seed": {}
            }, behavior["minecraft:item"].components)
            if (cropId.value != "") {
                behavior["minecraft:item"].components["minecraft:seed"] = Object.assign({
                    "crop_result": cropId.value
                }, behavior["minecraft:item"].components["minecraft:seed"])
            }
            if (blockList.childElementCount > 0) {
                let blocks = [];
                for (let block of blockList.children) {
                    blocks.push(block.children[0].children[1].value)
                }
                behavior["minecraft:item"].components["minecraft:seed"] = Object.assign({
                    "plant_at": blocks
                }, behavior["minecraft:item"].components["minecraft:seed"])
            }
        }
        if (stackedByData.checked) {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:stacked_by_data": stackedByData.checked
            }, behavior["minecraft:item"].components)
        }
        if (useDuration.value != "") {
            behavior["minecraft:item"].components = Object.assign({
                "minecraft:use_duration": parseInt(useDuration.value)
            }, behavior["minecraft:item"].components)
        }
        behaviorResult.value = JSON.stringify(behavior, null, 4);

        let resource = {
            "format_version": "1.10",
            "minecraft:item": {
                "description": {
                    "identifier": identifier.value,
                    "category": itemCategory.options[itemCategory.selectedIndex].value
                },
                "components": {
                    "minecraft:icon": identifier.value.substring(identifier.value.indexOf(":") + 1),
                }
            }
        }
        if (useAnimation.options[useAnimation.selectedIndex].value !== "none") {
            resource["minecraft:item"].components = Object.assign({
                "minecraft:use_animation": useAnimation.options[useAnimation.selectedIndex].value
            }, resource["minecraft:item"].components);
        }
        if (hoverTextColor.options[hoverTextColor.selectedIndex].value !== "none") {
            resource["minecraft:item"].components = Object.assign({
                "minecraft:hover_text_color": hoverTextColor.options[hoverTextColor.selectedIndex].value
            }, resource["minecraft:item"].components);
        }
        resourceResult.value = JSON.stringify(resource, null, 4);

        let textureAtlas = {
            [identifier.value.substring(identifier.value.indexOf(":") + 1)]: {
                "textures": texturePath.value
            }
        }

        atlasResult.value = JSON.stringify(textureAtlas, null, 4);

        let langResult = `item.${identifier.value}.name=${translatedName.value}`;
        translationResult.value = langResult;
    } else {
        let behavior = {
            "format_version": "1.10",
            "minecraft:block": {
                "description": {
                    "identifier": identifier.value,
                    "is_experimental": isExperimental.checked,
                    "register_to_creative_menu": registerCreative.checked
                },
                "components": {

                }
            }
        }

        if (loottable.value !== "") {
            behavior["minecraft:block"].components = Object.assign({
                "minecraft:loot": loottable.value
            }, behavior["minecraft:block"].components);
        }
        if (destroyTime.value !== "") {
            behavior["minecraft:block"].components = Object.assign({
                "minecraft:destroy_time": parseFloat(destroyTime.value)
            }, behavior["minecraft:block"].components);
        }
        if (explosionResistance.value !== "") {
            behavior["minecraft:block"].components = Object.assign({
                "minecraft:explosion_resistance": parseFloat(explosionResistance.value)
            }, behavior["minecraft:block"].components);
        }
        if (friction.value !== "") {
            behavior["minecraft:block"].components = Object.assign({
                "minecraft:friction": parseFloat(friction.value)
            }, behavior["minecraft:block"].components);
        }
        if (document.getElementById("flammable").checked) {
            behavior["minecraft:block"].components = Object.assign({
                "minecraft:flammable": {}
            }, behavior["minecraft:block"].components);
            if (flameOdds.value !== "") {
                behavior["minecraft:block"].components["minecraft:flammable"] = Object.assign({
                    "flame_odds": parseInt(flameOdds.value)
                }, behavior["minecraft:block"].components["minecraft:flammable"]);
            }
            if (burnOdds.value !== "") {
                behavior["minecraft:block"].components["minecraft:flammable"] = Object.assign({
                    "burn_odds": parseInt(burnOdds.value)
                }, behavior["minecraft:block"].components["minecraft:flammable"]);
            }
        }
        behavior["minecraft:block"].components = Object.assign({
            "minecraft:map_color": mapColor.value
        }, behavior["minecraft:block"].components);
        if (lightAbsorption.value !== "") {
            behavior["minecraft:block"].components = Object.assign({
                "minecraft:block_light_absorption": parseInt(lightAbsorption.value)
            }, behavior["minecraft:block"].components);
        }
        if (lightEmission.value !== "") {
            behavior["minecraft:block"].components = Object.assign({
                "minecraft:block_light_emission": parseFloat(lightEmission.value)
            }, behavior["minecraft:block"].components);
        }

        behaviorResult.value = JSON.stringify(behavior, null, 4);

        let resource = {
            [identifier.value]: {
                "textures": identifier.value.substring(identifier.value.indexOf(":") + 1)
            }
        }
        resourceResult.value = JSON.stringify(resource, null, 4);

        let atlas = {
            [identifier.value.substring(identifier.value.indexOf(":") + 1)]: {
                "textures": texturePath.value
            }
        }


        atlasResult.value = JSON.stringify(atlas, null, 4);

        let langResult = `tile.${identifier.value}.name=${translatedName.value}`;
        translationResult.value = langResult;
    }
}