<div align="center">
    <img style="margin-right:10px;border-radius:10px;" width="75" height="75" src="./assets/Hue Icon.png" alt="Hue Icon">
    <img style="border-radius:10px;border-radius:10px;" width="75" src="./assets/Terminal Icon.png" alt="Terminal Icon">
</div>
<h1 align="center">HeyHue</h1>

## Commands

-   `connect`
-   `off [all]`
-   `off [all]`

## Installation

1. Clone the repository

    ```bash
    git clone https://github.com/FellowshipOfThePing/heyhue.git
    ```

2. `cd` into the repository's root directory

    ```bash
    cd heyhue
    ```

3. Once inside the root directory, install the package globally

    ```bash
    yarn global add file:$PWD
    ```

4. Run the `connect` command

    ```bash
    hue connect
    ```

    > Running this command will prompt you to enter in your Hue Bridge's IP address and a valid username. To find this information, see the [Configuring the CLI](#configuring-the-CLI) section below.

5. Paste in your IP address and username, and hit return

## Configuring the CLI
