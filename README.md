# cribbage

A cribbage score-tracker, designed for KaiOS first.

## Use

You can start using `cribbage` from a browser at [cribbage.hd-dn.com](https://cribbage.hd-dn.com). On a smartphone or desktop there are buttons to perform all the actions. Feature phones with arrow keys and desktops also have to the following commands:

| Keybinding   | Action                         |
| ------------ | ------------------------------ |
| `ArrowUp`    | Add score to active player     |
| `ArrowDown`  | Remove score for active player |
| `ArrowLeft`  | Swap to left player            |
| `ArrowRight` | Swap to right player           |

## Installation

You can install `cribbage` by cloning the repository and sideloading it to your KaiOS device.

If you haven't done so before I recommend following [Martin Kaptein's guide to sideloading apps](https://kaptein.me/blog/sideloading-and-deploying-apps-to-kai-os/).

If you have npm installed you can also use [gdeploy](https://gitlab.com/suborg/gdeploy/), a CLI application manager for KaiOS devices.

1. Download and install gdeploy
2. Clone the `cribbage` repository and `cd` into it
3. Put your phone into debug mode (try dialling "\*#\*#33284#\*#\*" or "\*#\*#debug#\*#\*") and connect it

**Note:** The next step will remove _all_ sideloaded applications with "cribbage" in the name. In the unlikely event that one of your own applications matches this, **do not run the next step without modifying `install.sh`**.

4. Run `install.sh`

```sh
$ ./install.sh
Uninstalling old versions
GDEPLOY
-------
Application <old-application-id> uninstalled successfully

Installing latest version
GDEPLOY
-------
Application <new-application-id> installed successfully

Done!
```

5. Confirm installation and take your phone out of debug mode if you want

## Thanks

Thanks to Martin Kaptein and the gdeploy developers for making their knowledge and tools publically available. Thanks as well to 100R for creating [Dotgrid](https://100r.co/site/dotgrid.html), which I used to make the icons.

## Copyright

I don't exert copyright on this software, its source code, or any of the icons. Use them however you want!
