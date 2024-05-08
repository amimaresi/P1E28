import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { NavLink, Outlet } from 'react-router-dom';
import Subtract from './img/Subtract.svg';

export default function Guide() {
  return (
    <>
      <div className='relative'>
        <img src={Subtract} alt="Subtract" />
        <h1  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-title text-6xl font-bold">
          Besoin d'aide
      </h1>
      <h3 className="absolute top-3/4 left-1/2 -translate-x-1/2 translate-y-1/8 font-title text-3xl font-semibold">
      Questions fréquemment posées !
      </h3>
      </div>
      
      <div className="m-8 flex items-center justify-center bg-white p-8">
        <div className="flex w-full flex-col items-center">
          <Accordion type="single" collapsible className="m-14 p-16">
            <AccordionItem value="item-1">
              <AccordionTrigger className="accordion-trigger">
                Comment effectuer une recherche sur le site ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
              <div>1. Utiliser la fonction de recherche du site: Vous pouvez la trouver en haut de la page d'accueil ou dans le menu. Entrez simplement les mots-clés pertinents, tels que le nom d'un chercheur, le titre d'une publication, le sujet d'un projet etc..., dans la barre de recherche.</div>
              <div>2. Filtrer les résultats de recherche : Une fois que vous avez effectué votre recherche, vous pouvez généralement utiliser des filtres pour affiner les résultats. Ces filtres peuvent inclure des options telles que la date de publication, le type de contenu (publication, projet, chercheur, etc.), les mots-clés, les auteurs, etc. Utilisez ces filtres pour obtenir des résultats plus précis et pertinents.</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="accordion-trigger">
                Comment afficher les profils des chercheurs et quelles
                informations peuvent être consultées ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
              <div>Explorer les profils des chercheurs : Si vous cherchez des informations sur des chercheurs spécifiques, vous pouvez généralement accéder à leur profil sur le site. Ces profils peuvent fournir des détails sur leur biographie, leurs domaines de recherche, leurs publications, leurs projets en cours, leurs encadrements,leurs informations personnelles etc...</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="accordion-trigger">
                Comment modifier les informations personnelles et
                professionnelles sur mon profil ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div>Pour modifier vos informations personnelles et professionnelles sur votre profil en accédant aux paramètres (settings), suivez ces étapes générales :</div>
                <div>1. Connexion: Assurez-vous d'être connecté à votre compte sur le site.</div>
                <div>2. Accéder aux paramètres: Recherchez une icône représentant les paramètres, symbolisé par le mot "Settings". Ce lien se trouve souvent dans le coin supérieur droit de la page ou dans un menu déroulant.</div>
                <div>3. Modifier les informations: Vous devriez maintenant voir une page où vous pouvez modifier différentes informations telles que votre nom, votre adresse e-mail, votre photo de profil, etc... Modifiez les champs pertinents selon vos besoins.</div>
                <div>4. Enregistrer les modifications: Assurez-vous de sauvegarder vos modifications une fois que vous avez terminé. Cela est fait en cliquant sur un bouton "Sauvegarder"</div>
                <div>5. Vérifier les changements: Après avoir enregistré vos modifications, assurez-vous de vérifier votre profil pour vous assurer que les informations ont été mises à jour correctement.</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="accordion-trigger">
                Comment ajouter mes publications, projets et encadrements autant
                que chercheurs ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div>1. Accédez à votre profil de chercheur: Une fois connecté à votre compte, accédez à votre profil de chercheur. Cela est fait en cliquant sur votre nom d'utilisateur.</div>
                <div>2. Ajoutez des publications: Recherchez une option permettant d'ajouter des publications à votre profil. Cette option est étiquetée comme "Ajouter une publication". Vous devrez généralement fournir des détails sur chaque publication tels que le titre,  l'année de publication, le journal ou la conférence, etc...</div>
                <div>3. Ajouter projets et encadrements: De la même manière, recherchez une option pour ajouter des projets et encadrements à votre profil</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="accordion-trigger">
                Comment ajouter de nouveaux chercheurs ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div>1. Utiliser la fonction de panneau de control: Vous pouvez la trouver en haut de la page.</div>
                <div>2. Ajout d'un nouveau chercheur: Une fois dans la section du panneau de control, cherchez une option pour ajouter un nouvel chercheur. Cette option est étiquetée comme "Ajouter un chercheur".</div>
                <div>3. Remplissage du formulaire d'ajout: Vous serez probablement dirigé vers un formulaire où vous pourrez saisir les informations du nouveau chercheur.</div>
                <div>4. Enregistrement des modifications: Une fois que vous avez saisi toutes les informations nécessaires, enregistrez les modifications. Cela est fait en cliquant sur un bouton "Ajouter".</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="accordion-trigger">
                Comment récupérer les nouvelles publications de tous les
                chercheurs du laboratoire ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div>Bla bla</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger className="accordion-trigger">
                Comment mettre à jour les détails des publications, des projets
                et des encadrements sur mon profil ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
              <div>Pour modifier et mettre à jour les détails des publications, des projets et des encadrements sur votre profil en accédant aux paramètres (settings), suivez ces étapes générales :</div>
                <div>1. Connexion: Assurez-vous d'être connecté à votre compte sur le site.</div>
                <div>2. Accéder aux paramètres: Recherchez une icône représentant les paramètres, symbolisé par un engrenage ou le mot "Editer". Ce lien se trouve souvent dans le coin supérieur droit de la page ou dans un menu déroulant.</div>
                <div>3. Modifier les informations: Vous devriez maintenant voir une page où vous pouvez modifier différentes informations. Modifiez les champs pertinents selon vos besoins.</div>
                <div>4. Enregistrer les modifications: Assurez-vous de sauvegarder vos modifications une fois que vous avez terminé. Cela est fait en cliquant sur un bouton "Sauvegarder"</div>
                <div>5. Vérifier les changements: Après avoir enregistré vos modifications, assurez-vous de vérifier votre profil pour vous assurer que les informations ont été mises à jour correctement.</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger className="accordion-trigger">
                Comment réinitialiser mon mot de passe si je l'ai oublié ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <div>1. Accédez à la page de connexion: Rendez-vous sur la page de connexion du site où vous avez un compte.</div>
                <div>2. Cliquez sur "Mot de passe oublié": sous le champ de saisie du mot de passe, il y a un lien ou un bouton étiqueté comme "Mot de passe oublié". Cliquez sur ce lien.</div>
                <div>3. Entrez votre adresse e-mail: Sur la page suivante, vous serez invité à saisir l'adresse e-mail associée à votre compte. Entrez cette adresse e-mail dans le champ prévu à cet effet.</div>
                <div>4. Suivez les instructions envoyées par e-mail: Après avoir soumis votre adresse e-mail, vous devriez recevoir un e-mail contenant des instructions pour réinitialiser votre mot de passe. Suivez ces instructions.</div>
                <div>5. Réinitialisez votre mot de passe: Sur la page de réinitialisation du mot de passe, vous serez invité à saisir un nouveau mot de passe. Choisissez un nouveau mot de passe sécurisé et saisissez-le dans les champs prévus à cet effet.</div>
                <div>6. Confirmez la réinitialisation: Une fois que vous avez saisi votre nouveau mot de passe, confirmez la réinitialisation en suivant les instructions fournies sur la page. Cela peut impliquer de cliquer sur un bouton "Confirmer".</div>
                <div>7. Connectez-vous avec votre nouveau mot de passe: Une fois que vous avez réinitialisé votre mot de passe avec succès, retournez à la page de connexion et connectez-vous à votre compte en utilisant votre adresse e-mail et votre nouveau mot de passe.</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger className="accordion-trigger">
                Comment accéder aux statistiques disponibles sur le site et
                comment les utiliser ?
              </AccordionTrigger>
              <AccordionContent className="accordion-content">
                <p>1. Repérez le bouton des statistiques: Sur la page web, recherchez un bouton qui indique "Statistiques". Ce bouton se trouve dans la barre de navigation.</p>
                <p>2. Explorez les données: Une fois dans la section des statistiques, vous devriez voir diverses données et métriques concernant l'utilisation du site.</p>
                <p>3. Utilisez les filtres et les options de visualisation: Les outils de statistiques proposent des filtres et des options de visualisation pour vous permettre d'analyser les données de différentes manières. Par exemple, vous pourriez être en mesure de filtrer les données par période de temps spécifique etc...</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
