<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  auth: false
});
</script>

<template>
  <GlobalWrapper>
    <div class="container photovoltaique-wrap mx-auto text-lg">
      <PageHeader image="/photovoltaique/header.png" image-alt="Panneaux photovoltaïques"
                  title="Panneaux photovoltaïques" />

      <section class="mt-5 description">
        <h2 class="font-extrabold text-3xl text-_primary-500">La technologie</h2>
        <div class="text-wrap flex flex-wrap justify-between">
          <div class="text mt-3 w-full md:w-2/3">
            <p>
              Les panneaux photovoltaïques sont des dispositifs conçus pour convertir la lumière solaire en électricité.
              Cette
              technologie repose sur l'effet photovoltaïque, un phénomène découvert au 19ème siècle, où certains
              matériaux
              génèrent un courant électrique lorsqu'ils sont exposés à la lumière.<br>
              Les principaux composants d'un panneau photovoltaïque sont les cellules solaires, généralement fabriquées
              en
              silicium, qui sont organisées en série et en parallèle pour former un module capable de produire une
              puissance
              électrique utilisable.
            </p>

            <h3 class="font-medium text-xl mt-4">Avantage des panneaux photovoltaïques</h3>
            <ul class="ml-2">
              <li>
                Énergie Renouvelable L'énergie solaire est une ressource inépuisable et propre, contrairement aux
                énergies fossiles qui sont limitées et polluantes.
              </li>
              <li>
                Réduction des Émissions de CO2 L'utilisation de l'énergie solaire permet de réduire significativement
                les émissions de gaz à effet de serre.
              </li>
              <li>
                Indépendance Énergétique Les installations photovoltaïques permettent aux utilisateurs de produire
                leur propre électricité, réduisant ainsi leur dépendance vis-à-vis des fournisseurs d'énergie.
              </li>
              <li>
                Économies sur le Long Terme Bien que l'investissement initial soit conséquent, les coûts de
                fonctionnement sont faibles, et les économies sur les factures d'électricité peuvent être importantes.
              </li>
            </ul>

            <h3 class="font-medium text-xl mt-4">Fonctionnement</h3>
            <p>
              Les panneaux photovoltaïques captent la lumière du soleil grâce aux cellules photovoltaïques. Ces cellules
              convertissent l'énergie lumineuse en courant continu (DC). Ce courant est ensuite transformé en courant
              alternatif (AC) par un onduleur, pour être utilisé dans les réseaux électriques domestiques ou
              industriels.
            </p>
          </div>

          <aside class="w-full md:w-1/3 flex flex-col">
            <NuxtLink to="/photovoltaique/visualisation"
                      class="font-extrabold text-_primary-500 text-2xl hover:underline ml-16">Découvrir l'installation
              actuelle
            </NuxtLink>
            <NuxtImg src="/photovoltaique/schema.webp" alt="Schéma d'un panneau photovoltaïque" />
          </aside>
        </div>
      </section>

      <section class="mt-5 installation">
        <h2 class="font-extrabold text-3xl text-_primary-500">L'installation au Magasin Connecté</h2>
        <p class="mt-3">
          Le Magasin Connecté sera bientôt équipé d'une installation photovoltaïque.<br>
          Voici plus de détails sur cette future installation
        </p>
        <div class="custom-cards mt-4">
          <div class="custom-card">
            <NuxtImg src="/photovoltaique/panneau.png" alt="Panneaux photovoltaïques" />
            <div class="text">
              <h3 class="font-medium text-xl mt-2">Panneaux Solaires</h3>
              <p>36 panneaux photovoltaïques de marque TRINA SOLAR, chaque panneau ayant une puissance de 435 Wc. Ces
                panneaux
                sont garantis pour 15 ans pour le matériel et 25 ans pour une performance minimale de 85% du rendement
                initial.</p>
            </div>
          </div>

          <div class="custom-card">
            <NuxtImg src="/photovoltaique/onduleur.png" alt="Onduleur" />
            <div class="text">
              <h3 class="font-medium text-xl mt-2">Onduleur</h3>
              <p> Un onduleur SOLAREDGE 16k est utilisé pour convertir le courant continu produit par les panneaux en
                courant
                alternatif. Cet onduleur est garanti 12 ans.</p>
            </div>
          </div>

          <div class="custom-card">
            <NuxtImg src="/photovoltaique/optimiseur.jpg" alt="Optimiseurs" />
            <div class="text">
              <h3 class="font-medium text-xl mt-2">Optimiseurs</h3>
              <p>18 optimiseurs SOLAREDGE P850, garantis 25 ans, sont intégrés pour maximiser la production d'énergie en
                cas
                d'ombrage ou de saleté sur certains panneaux.</p>
            </div>
          </div>

          <div class="custom-card">
            <NuxtImg src="/photovoltaique/kit_de_fixation.webp" alt="Structure de fixation" />
            <div class="text">
              <h3 class="font-medium text-xl mt-2">Structure de Fixation</h3>
              <p>Kit de fixation K2 Systems garanti 12 ans pour l'installation des panneaux sur une toiture en bac
                acier.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-5 rentability">
        <h2 class="font-extrabold text-3xl text-_primary-500">Rentabilité Théorique de l'installation</h2>
        <p class="mt-3">
          L'installation de panneaux photovoltaïques représente un investissement initial conséquent, mais elle peut
          s'avérer très rentable sur le long terme. Voici une estimation théorique de la rentabilité et du temps
          nécessaire pour rentabiliser l'installation.
        </p>
        <h3 class="font-medium text-xl mt-6">Production Annuelle Estimée</h3>
        <p>
          Chaque panneau de 435 Wc produit environ 1 000 kWh par kWc installé par an, en fonction de l'ensoleillement de
          la région de Marseille.<br>
          Pour 36 panneaux de 435 Wc, soit une capacité totale de 15,66 kWc, la production annuelle estimée serait
        </p>
        <math class="my-5 ml-4 mr-auto">
          <mrow>
            <mn>15,66</mn>
            <mo>&#xA0;</mo>
            <mi>kWc</mi>
            <mo>&#xA0;&#xD7;&#xA0;</mo>
            <mn>1 000</mn>
            <mi>kWh/kWc</mi>
            <mo>=</mo>
            <mn>15 660</mn>
            <mi>kWh/an</mi>
          </mrow>
        </math>
        <h3 class="font-medium text-xl mt-2">Économies Réalisées</h3>
        <p>
          Si le coût de l'électricité est de 0,18 € par kWh, les économies annuelles réalisées grâce à
          l'autoconsommation
          seraient
        </p>
        <math class="my-5 ml-4 mr-auto">
          <mrow>
            <mn>15 660</mn>
            <mi>kWh/an</mi>
            <mo>&#xA0;&#xD7;&#xA0;</mo>
            <mn>0,18</mn>
            <mi>€/kWh</mi>
            <mo>=</mo>
            <mn>2 818,80</mn>
            <mi>€</mi>
          </mrow>
        </math>

        <h3 class="font-medium text-xl mt-2">Délai de Rentabilisation</h3>
        <p>
          Le coût total de l'installation est de 30 558,00 € TTC.<br>
          En supposant que toutes les conditions restent constantes, le délai de rentabilisation serait
        </p>
        <math class="my-5 ml-4 mr-auto">
          <mrow>
            <mfrac>
              <mrow>
                <mn>30 558,00</mn>
                <mi>€</mi>
              </mrow>
              <mrow>
                <mn>2 818,80</mn>
                <mi>€/an</mi>
              </mrow>
            </mfrac>
            <mo>&#xA0;&#x2248;&#xA0;</mo>
            <mn>10,84</mn>
            <mi>ans</mi>
          </mrow>
        </math>


        <h3 class="font-medium text-xl mt-2">Exemples de Scénarios</h3>
        <p>
          Voici quelques scénarios hypothétiques basés sur différentes variables comme le coût de l'électricité, la
          dégradation des panneaux solaires, et les changements dans les conditions d'ensoleillement.
        </p>

        <h4 class="font-semibold text-lg mt-2">Scénario Optimiste</h4>
        <p>
          Si le coût de l'électricité augmente de 3% par an et l'ensoleillement reste constant, les économies annuelles
          pourraient augmenter proportionnellement. Par exemple, au bout de 5 ans
        </p>
        <math class="my-5 ml-4 mr-auto">
          <mrow>
            <mn>2 818,80</mn>
            <mo>&#xA0;&#xD7;&#xA0;</mo>
            <msup>
              <mrow>
                <mn>1,03</mn>
              </mrow>
              <mrow>
                <mn>5</mn>
              </mrow>
            </msup>
            <mo>&#xA0;&#x2248;&#xA0;</mo>
            <mn>3 264,77</mn>
            <mi>€</mi>
          </mrow>
        </math>
        <p>
          Ainsi, au bout de 5 ans, les économies annuelles pourraient atteindre environ 3 264,77 €.
        </p>

        <h4 class="font-semibold text-lg mt-2">Scénario Pessimiste</h4>
        <p>
          Si la performance des panneaux solaires diminue de 1% par an en raison de la dégradation, et que le coût de
          l'électricité reste constant, les économies annuelles après 5 ans pourraient être
        </p>
        <math class="my-5 ml-4 mr-auto">
          <mrow>
            <mn>2 818,80</mn>
            <mo>&#xA0;&#xD7;&#xA0;</mo>
            <msup>
              <mrow>
                <mn>0,99</mn>
              </mrow>
              <mrow>
                <mn>5</mn>
              </mrow>
            </msup>
            <mo>&#xA0;&#x2248;&#xA0;</mo>
            <mn>2 689,06</mn>
            <mi>€</mi>
          </mrow>
        </math>
        <p>
          Donc, au bout de 5 ans, les économies annuelles pourraient diminuer à environ 2 689,06 €.
        </p>

        <h4 class="font-semibold text-lg mt-2">Scénario Réaliste</h4>
        <p>
          En supposant une augmentation modérée du coût de l'électricité de 1,5% par an et une légère dégradation des
          panneaux de 0,5% par an, les économies annuelles après 5 ans seraient
        </p>
        <math class="my-5 ml-4 mr-auto">
          <mrow>
            <mn>2 818,80</mn>
            <mo>&#xA0;&#xD7;&#xA0;</mo>
            <msup>
              <mrow>
                <mn>1,015</mn>
              </mrow>
              <mrow>
                <mn>5</mn>
              </mrow>
            </msup>
            <mo>&#xA0;&#xD7;&#xA0;</mo>
            <msup>
              <mrow>
                <mn>0,995</mn>
              </mrow>
              <mrow>
                <mn>5</mn>
              </mrow>
            </msup>
            <mo>&#xA0;&#x2248;&#xA0;</mo>
            <mn>2 906,59</mn>
            <mi>€</mi>
          </mrow>
        </math>
        <p>
          Ainsi, au bout de 5 ans, les économies annuelles pourraient être environ 2 906,59 €.
        </p>
      </section>

      <section class="mt-5">
        <NuxtLink to="/photovoltaique/visualisation" class="font-extrabold text-_primary-500 text-2xl hover:underline">
          Découvrir l'installation actuelle
        </NuxtLink>
      </section>
    </div>
  </GlobalWrapper>
</template>

<style scoped>
@import url('~/assets/css/photovoltaique.css');
</style>