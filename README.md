
# hubot-yubibot

Hubot plugin that reacts to _ccccccfnhnvdgbjevuuiggkbkrhfhfjkkcrhelbjkhck_

## Installation

In your hubot repository, run:

`yarn add https://github.com/firstlookmedia/hubot-yubibot`

Then add **hubot-yubibot** to your `external-scripts.json`:

```
["hubot-yubibot"]
```

## Configuration

* YUBIBOT_REACTION_NAME - The name of the reaction, defaults to `key`

## Example

At FLM we've added a custom `yubi` reaction which display the Yubico logo, and configure `YUBIBOT_REACTION_NAME` to match:

![Yubibot Example](./example.png?raw=true "Yubibot Example")

## Resources

* https://www.yubico.com/products/yubikey-hardware/
* https://hubot.github.com/
