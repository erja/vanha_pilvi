# Pilviohjelmointi

Tämä on Pilviohjelmointi-kurssin repository. Täältä löydät tunneilla käytetyt koodit.

Jatkossa tänne tulee myös kurssin tuntiesitykset.

# 1 Aluksi

## 1.1 Ota Cloud9 käyttöön

Tee itsellesi tunnus **Cloud 9**-ympäristöön (https://c9.io) ja sisäänkirjaudu. Tee uusi työtila *create a new workspace* button. Anna nimeksi **pilvi** ja anna kuvaus *Full-Stack Development*. Valitse **private** optio ja oletusarvoinen **custom** malli.

Klikkaa **Create Workspace** -nappia. Tämä luo uuden projektin.

Konfiguroi Cloud 9 -editori. Avaa preferences-ikkuna **Cloud 9 > Preferences** -valikosta.

1.  **Code Editor** -osio
  - poista valinta _soft tabs_ box ja aseta tab size 2:ksi. 
  - ota pois päältä **Autodetect tab size on load**.
  - pane päälle **On save strip whitespace**
2.  **Hints and Warnings** -osio
  - ota pois päältä **Mark missing optional semicolons**
  - varmista, että **customise javascript warnings with .eshintrc** on päällä

Etsi _Terminal_ -ikkuna. Terminaali-ikkunaa tarvitaan git-komentojen antamiseksi. Lisäksi sitä tarvitaan ympäristön virittämisessä ja asennuksissa. Kurssin koodit löytyvät githubista, joten kloonaa ne ensimmäiseksi itsellesi. 
```
git clone https://github.com/erja/pilviohjelmointi.git
```
Näin saat kurssin koodit hakemistoon `pilviohjelmointi/`, ja hakemistorakenne pitäisi näkyä puuna. Git-komentoja käyttääksesi sinun tulisi olla `pilviohjelmointi/` hakemistossa.
```
cd pilviohjelmointi/
git status
```
## 1.2 Tee oma etärepository GitLabiin

Tee itsellesi tunnus ja kirjaudu sisään **GitLab** (https://gitlab.com). Luo uusi tyhjä repository klikkaamalla **New project** -nappia. Valitse *project path* -valinnassa **Pilvi** ja *Description* -kentässä kirjoita *Omat koodi pilviohjelmoinnissa*. Aseta *visibility level* -asetus **Private** ja klikkaa **Create Project*. 

Koska olet kloonannut kurssin repon, näkyy **Cloud 9**-terminaalissa yksi etärepository nimeltään origin. Tarkista: 

```
$ git remote -v
origin	https://github.com/erja/pilviohjelmointi.git (fetch)
origin	https://github.com/erja/pilviohjelmointi.git (push)
```

Muutetaan tämä

```
$ git remote set-url origin oma_GitLab_URL
$ git remote -v

origin	https://gitlab.com/sinun_GitLab_tunnus/oma_repo_nimi.git (fetch)
origin	https://gitlab.com/sinun_GitLab_tunnus/oma_repo_nimi.git (push)
```


Aina kun teet muutoksia, vie muutoksesi omaan repoosi

```
git push origin master
```

##1.3 Kurssin repository on muuttunut

Joskus kurssin repository muuttuu ja sinun täytyy saada muutokset itsellesi.

```
$ git remote
origin
$ git remote add kurssi https://github.com/erja/pilviohjelmointi.git
$ git remote -v
origin	https://gitlab.com/sinun_GitLab_tunnus/oma_repo_nimi.git (fetch)
origin	https://gitlab.com/sinun_GitLab_tunnus/oma_repo_nimi.git (push)
kurssi	https://github.com/erja/pilviohjelmointi.git (fetch)
kurssi	https://github.com/erja/pilviohjelmointi.git (push)
```

Nyt sinulla on kaksi etärepositorya. Origin-nimellä on omasi, jonne viet muutokset. Kurssi-nimellä on kurssin repository, jonka aina silloin tällöin muuttuu. Saat lomitettua kaiken muuttuneen omasi kanssa.  

```
$ git pull kurssi master
```

Lopuksi konfiguroi vielä Cloud 9 -ympäristössä nimesi ja sähköpostiosoitteesi. Aseta ne samaksi, joita käytit GitLab-tunnusta luodessasi. 
```
git config --global user.name 'Sinun Nimesi'
git config --global user.email 'sina@email.com'
```

## 1.4 Päivitä Cloud Server

Poistetaan turhat Cloud 9 -ympäristöstä. Cloud tulee **Ubuntu**:lla, jossa on valmiina  built-in _package manager_ (apt). Cloud 9 -ympäristössä on valmiina useita kieliä (PHP, Python and Java). Katsotaan mitä löytyy
```
dpkg --get-selections | grep php
dpkg --get-selections | grep python
pkg --get-selections | grep jre
```
Poistetaan ne, mitä ei tarvita. Tämä säästää tilaa ja nostaa serverin tehokkuutta. _Autoremove_ poistaa turhat pakkaukset ja siistii serverin
```
sudo apt-get remove php5 python3 openjdk-7-jre
sudo apt-get autoremove
```
Seuraavaksi asennetaan _Kerberos_ dev -kirjastot. Näitä tarvitaan kommunikointiin tietokantojen kanssa
```
sudo apt-get update
sudo apt-get install -y libkrb5-dev
```

Päivitetään vielä node.js ja asennetaan express.

## 1.5 Päivitä Node

Tarkistetaan, mikä versio NodeJS:stä on Cloud 9 -ympäristössä. 

Noden päivitykseen ja hallintaan käytetään **nvm**  (Node Version Manager). Oletusarvoisesti tämä ei ole asennettuna. Asennetaan se käyttäen **npm** (Node Package Manager). Lippu _-g_ kertoo npm:lle, että moduuli asennetaan globaaliksi. 
```
npm install -g nvm
```
Jos tämä epäonnistuu, tee se sudona. Jos tämäkin epäonnistuu, täytyy asentaa manuaalisesti, kokeile  _curl_:ia:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```

Otetaan käyttöön uusin versio
```
node -v
  v0.10.35
nvm list-remote
nvm install 5.2.0
node -v
  v5.2.0
```
Kokeile sulkemalla nykyinen terminaali-ikkuna ja avaamalla uusi. Jos tarkistat Noden version, se on palautunut aiemmin installoiduksi. Tämä johtuu siitä, että vanha versio on asetettu oletusarvoksi _default_. Korjataan tämä
```
node -v
  v0.10.35
nvm alias default 5.2.0
node -v
  v5.2.0
```
Kokeile uudestaan uudessa terminaalissa, onko tilanne muuttunut.

Node perustuu Chrome v8 ajoaikaiseen. jos haluat mikä ajonaikainen versio on installoituna, saat sen selville: 
```
node -p process.versions.v8
  4.6.85.31
```

