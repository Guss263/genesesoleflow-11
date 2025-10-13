import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Ruler } from "lucide-react";

const SizeGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Guia de Tamanhos</h1>
        
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Como Medir seu Pé</h2>
          </div>
          <ol className="list-decimal list-inside space-y-3 mb-8">
            <li>Coloque uma folha de papel no chão encostada na parede</li>
            <li>Fique em pé sobre o papel com o calcanhar encostado na parede</li>
            <li>Marque o ponto mais distante do seu pé</li>
            <li>Meça a distância da parede até a marca</li>
            <li>Use a tabela abaixo para encontrar seu tamanho</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tabela Masculino</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead className="bg-muted">
                <tr>
                  <th className="border p-3">Brasil (BR)</th>
                  <th className="border p-3">EUA (US)</th>
                  <th className="border p-3">Europa (EU)</th>
                  <th className="border p-3">Reino Unido (UK)</th>
                  <th className="border p-3">Centímetros (CM)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3 text-center">38</td><td className="border p-3 text-center">6</td><td className="border p-3 text-center">39</td><td className="border p-3 text-center">5.5</td><td className="border p-3 text-center">24.5</td></tr>
                <tr><td className="border p-3 text-center">39</td><td className="border p-3 text-center">7</td><td className="border p-3 text-center">40</td><td className="border p-3 text-center">6</td><td className="border p-3 text-center">25</td></tr>
                <tr><td className="border p-3 text-center">40</td><td className="border p-3 text-center">7.5</td><td className="border p-3 text-center">41</td><td className="border p-3 text-center">6.5</td><td className="border p-3 text-center">25.5</td></tr>
                <tr><td className="border p-3 text-center">41</td><td className="border p-3 text-center">8</td><td className="border p-3 text-center">42</td><td className="border p-3 text-center">7</td><td className="border p-3 text-center">26</td></tr>
                <tr><td className="border p-3 text-center">42</td><td className="border p-3 text-center">9</td><td className="border p-3 text-center">43</td><td className="border p-3 text-center">8</td><td className="border p-3 text-center">27</td></tr>
                <tr><td className="border p-3 text-center">43</td><td className="border p-3 text-center">10</td><td className="border p-3 text-center">44</td><td className="border p-3 text-center">9</td><td className="border p-3 text-center">28</td></tr>
                <tr><td className="border p-3 text-center">44</td><td className="border p-3 text-center">11</td><td className="border p-3 text-center">45</td><td className="border p-3 text-center">10</td><td className="border p-3 text-center">29</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tabela Feminino</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead className="bg-muted">
                <tr>
                  <th className="border p-3">Brasil (BR)</th>
                  <th className="border p-3">EUA (US)</th>
                  <th className="border p-3">Europa (EU)</th>
                  <th className="border p-3">Reino Unido (UK)</th>
                  <th className="border p-3">Centímetros (CM)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3 text-center">34</td><td className="border p-3 text-center">5</td><td className="border p-3 text-center">35</td><td className="border p-3 text-center">2.5</td><td className="border p-3 text-center">22</td></tr>
                <tr><td className="border p-3 text-center">35</td><td className="border p-3 text-center">6</td><td className="border p-3 text-center">36</td><td className="border p-3 text-center">3.5</td><td className="border p-3 text-center">22.5</td></tr>
                <tr><td className="border p-3 text-center">36</td><td className="border p-3 text-center">7</td><td className="border p-3 text-center">37</td><td className="border p-3 text-center">4</td><td className="border p-3 text-center">23</td></tr>
                <tr><td className="border p-3 text-center">37</td><td className="border p-3 text-center">7.5</td><td className="border p-3 text-center">38</td><td className="border p-3 text-center">4.5</td><td className="border p-3 text-center">23.5</td></tr>
                <tr><td className="border p-3 text-center">38</td><td className="border p-3 text-center">8</td><td className="border p-3 text-center">39</td><td className="border p-3 text-center">5</td><td className="border p-3 text-center">24</td></tr>
                <tr><td className="border p-3 text-center">39</td><td className="border p-3 text-center">9</td><td className="border p-3 text-center">40</td><td className="border p-3 text-center">6</td><td className="border p-3 text-center">25</td></tr>
                <tr><td className="border p-3 text-center">40</td><td className="border p-3 text-center">10</td><td className="border p-3 text-center">41</td><td className="border p-3 text-center">7</td><td className="border p-3 text-center">26</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Dicas Importantes</h2>
          <ul className="space-y-2">
            <li>• Meça os dois pés e use a medida do pé maior</li>
            <li>• Faça a medição no final do dia quando os pés estão mais inchados</li>
            <li>• Use meias que você pretende usar com os tênis</li>
            <li>• Em caso de dúvida entre dois tamanhos, escolha o maior</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;
