export default function PrivacyPolicyPage() {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6">Politica de Confidențialitate – AutoFlex</h1>
  
        <section className="space-y-4 text-sm leading-6 text-muted-foreground">
          <p>
            Confidențialitatea datelor tale este importantă pentru noi. În această politică explicăm
            ce date colectăm, cum le folosim și care sunt drepturile tale ca utilizator al platformei AutoFlex.
          </p>
  
          <h2 className="text-lg font-semibold mt-6">1. Ce date colectăm</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Nume și prenume</li>
            <li>Adresa de email</li>
            <li>Număr de telefon</li>
            <li>Informații despre vehiculele publicate sau rezervate</li>
            <li>Adrese IP și date de autentificare</li>
          </ul>
  
          <h2 className="text-lg font-semibold mt-6">2. Cum folosim aceste date</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Pentru a facilita înregistrarea și autentificarea conturilor</li>
            <li>Pentru a gestiona rezervările de mașini</li>
            <li>Pentru a îmbunătăți experiența utilizatorului în platformă</li>
            <li>Pentru a trimite notificări legate de cont, rezervări sau suport</li>
          </ul>
  
          <h2 className="text-lg font-semibold mt-6">3. Stocarea și securitatea datelor</h2>
          <p>
            Datele sunt stocate în baze de date securizate. Folosim măsuri de protecție standard
            (SSL, criptare, autentificare) pentru a preveni accesul neautorizat.
          </p>
  
          <h2 className="text-lg font-semibold mt-6">4. Partajarea datelor</h2>
          <p>
            Nu vindem și nu partajăm datele tale personale cu terți, cu excepția cazurilor legale sau
            când este necesar pentru funcționarea platformei (ex. servicii de email, cloud).
          </p>
  
          <h2 className="text-lg font-semibold mt-6">5. Drepturile tale</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Dreptul de acces la datele personale</li>
            <li>Dreptul de rectificare sau ștergere</li>
            <li>Dreptul de restricționare a prelucrării</li>
            <li>Dreptul de opoziție</li>
            <li>Dreptul la portabilitatea datelor</li>
          </ul>
  
          <h2 className="text-lg font-semibold mt-6">6. Cookie-uri</h2>
          <p>
            Platforma poate folosi cookie-uri pentru a reține preferințele tale, pentru autentificare
            și pentru analiză de trafic. Poți alege să le dezactivezi din setările browserului.
          </p>
  
          <h2 className="text-lg font-semibold mt-6">7. Contact</h2>
          <p>
            Pentru întrebări sau solicitări legate de datele tale personale, ne poți contacta la:{" "}
            <a href="mailto:privacy@autoflex.ro" className="text-primary underline">privacy@autoflex.ro</a>.
          </p>
  
          <p className="mt-8 text-xs text-gray-500">Ultima actualizare: Aprilie 2025</p>
        </section>
      </div>
    )
  }
  