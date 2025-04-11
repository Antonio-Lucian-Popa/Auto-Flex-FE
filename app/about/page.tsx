import { Card } from "@/components/ui/card"
import { Car, Shield, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Despre AutoFlex</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transformăm modul în care oamenii închiriază și testează mașini, conectând proprietari de mașini cu clienți într-o platformă sigură și de încredere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6">
          <Car className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Varietate de Mașini</h3>
          <p className="text-muted-foreground">
            Oferim acces la o gamă largă de mașini, de la modele economice până la mașini de lux, toate verificate și sigure.
          </p>
        </Card>

        <Card className="p-6">
          <Shield className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Siguranță Garantată</h3>
          <p className="text-muted-foreground">
            Toate mașinile sunt verificate tehnic și asigurate complet pentru siguranța dumneavoastră.
          </p>
        </Card>

        <Card className="p-6">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Comunitate de Încredere</h3>
          <p className="text-muted-foreground">
            O comunitate activă de proprietari și clienți verificați, cu sistem de rating și review-uri.
          </p>
        </Card>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Misiunea Noastră</h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          Ne propunem să democratizăm accesul la mobilitate, oferind o platformă sigură și eficientă pentru închirierea și testarea mașinilor între persoane fizice. Credem în puterea economiei colaborative și în construirea unei comunități bazate pe încredere și respect reciproc.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Cifre Importante</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-4xl font-bold text-primary">1000+</p>
            <p className="text-lg text-muted-foreground">Mașini Disponibile</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">5000+</p>
            <p className="text-lg text-muted-foreground">Utilizatori Activi</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">10000+</p>
            <p className="text-lg text-muted-foreground">Închirieri Realizate</p>
          </div>
        </div>
      </div>
    </div>
  )
}