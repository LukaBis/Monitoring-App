# Monitoring Aplikacija  

## Opis  

Web aplikacija omogućuje slanje SMS poruke koristeći Infobip API. Aplikacija će moći
obavijestiti korisnika o tome je li poruka uspješno dostavljena pozivajući još jedan odvojeni
API i imat će mogućnost ručne korekcije statusa dostave u slučaju da je dohvaćen status
dostave neispravan.  

Frontend dio aplikacije će korisniku omogućiti sučelje preko kojeg će unijeti podatke, poslati
poruku te izlistati sve poslane poruke kako bi se vidio njihov status (uspješno dostavljeno ili
ne). Na frontend-u će također biti vidljiv gumb koji će omogućiti ručnu izmjenu statusa
poruke. Ovaj dio aplikacije će biti izgrađen pomoću React javascript knjižnice.
Backend će biti izgrađen sa Java Spring Boot framework-om. Backend će koristiti Infobipove
API-je za slanje poruka i provjere statusa poslanih poruka. U bazu podataka će se spremati
poruke, njihovi statusi, mobilni brojevi na koje su poruke poslane itd.  

## Lista funkcionalnosti  

- slanje poruke preko weba  
  - unos teksta poruke  
  - unos datoteke koja se šalje porukom  
  - odabir jednog ili više mobilnih brojeva kojima se šalje poruka (brojevi se mogu lako birati iz kasnije spomenutog imenika)  
  - gumb za slanje poruke  

- imenik svih mobilnih brojeva  
  - prikaz tablice svih mobilnih brojeva prema kojima se često šalju poruke  
  - filtriranje mobilnih brojeva po operateru, imenu korisnika  

- korekcija delivery reporta preko weba  
  - checkbox za potvrdu dolaska poruke  

- obrazac za spremanje mobilnog broja u imenik  
  - polje za unos samog broja  
  - polje za unos imena korisnika  
  - gumb koji šalje request da se broj spremi u imenik  

- prikaz broja ukupno poslanih poruka (tablica)  
- prikaz postotka uspješnosti dostavljanja **svih poruka**  
- prikaz postotka uspješnosti dostave poruka **za pojedine brojeve**  
- autentikacija korisnika  
- responzivni web dizajn  

- navigacija koja ima poveznice na sljedeće dijelova aplikacije  
  - home page  
  - obrazac za slanje poruke  
  - tablicu svih poruka  
  - imenik  
- mogućnost filtriranja poruka prikazanih u tablici (korisnik može filtrirati poruke prema mobilnim brojevima, datumu slanja, operateru kao što su A1, Telemach itd.)  
- prikaz brojeva kojima se najčešće šalju poruke (prikazano na home page)  
- prikaz posljednjih mobilnih brojeva kojima se slala poruka (prikazano na home page)

## Pokretanje Aplikacije

Za pokretanje je potrebno imati instaliran Docker i Docker compose. Nakon toga u project root folderu:

```
docker compose up
```

Gore navedena naredba ce pokrenuti dva containera (za sad samo dva, kasnije mozda i vise). U jednom containeru se nalazi Java Spring dio a u drugom React.

### Pokretanje backenda u development okruzenju

Za development okruzenje docker compose koristi Dockerfile.dev datoteku. Nakon sto je backend container pokrenut mozemo pristupiti njegovom shellu:

```
docker exec -it container-id /bin/sh
```

Nakon toga pokrecemo spring aplikaciju:

```
./mvnw spring-boot:run
```

Na ovaj nacin svaki put kad napravimo promjenu u kodu mozemo jednostavno zaustavit proces sa CTR + C te ponovno pokrenut spring aplikaciju sa prethodno
spomenutom naredbom i vidjet promjene.

Pokretanje testova

```
./mvnw test
```

### Kako pronaci IP adresu backend containera

```
docker inspect container-id | grep IPAddress
```

# Baza podataka

https://drive.google.com/file/d/1mhXHwnF7yGrfbVuAJE0AC-ymZj-Cgoaz/view?usp=sharing

# Link na aplikaciju u produkciji

http://3.135.237.46:3000/
