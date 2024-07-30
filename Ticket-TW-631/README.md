### [🔙 retour vers le Projet complet](https://github.com/users/theox33/projects/1/views/1)

# Table des matières

- [🎯 Mission : BACKOFFICE - OptionUI – Rebranding](#mission--backoffice---optionui--rebranding)



- [🔄 Modifications apportées](#modifications-apportées)
  - [📁 1er fichier : SolutionController.php](#1er-fichier-)
  - [📁 2e fichier : show.html.twig](#2e-fichier-)
    - [✅ Implémentation des coches](#implémentation-des-coches)
    - [🆕 Création d’un nouveau module CUSTOM](#création-dun-nouveau-module-custom)



- [🔍 Vérification](#vérification)



- [🔧 Fix](#fix)
  - [🔧 Fix : wider modal](#fix--wider-modal)
  - [🔧 Fix : enable continue button](#fix--enable-continue-buton)
  - [🔧 Fix : update columns](#fix--update-columns)
  - [🔧 Fix : oubli](#fix--oubli)



- [🧪 Tests et Vérification](#tests-et-vérification)
  - [⚙️ Mise en place](#mise-en-place)
  - [🖥️ Test du Back-Office-Manager](#test-du-back-office-manager)



- [🎥 Démonstration](#démonstration)
  - [📹 1er test](#1er-test)
  - [📹 2e test](#2e-test)
  - [📹 3e test](#3e-test)


## Mission : [BACKOFFICE] - OptionUI – Rebranding

Description : Dans le cadre du rebranding, il est nécessaire de pouvoir modifier les deux informations CanGoBackHome et IsWebEPH uniquement pour un module custom via le backoffice.

Il s'agit en réalité de la suite logique du 1er ticket [`TW-611`](https://github.com/users/theox33/projects/1/views/1?pane=issue&itemId=72105190) qui consistait à modifier la partie back avec la base de donnée. Ce ticket-ci est le front où il va falloir implémenter les fonctionnalités graphiques sur le `Back-Office-Manager-V4`.



**Solution Technique Détaillée :**

- Modification du fichier `src\Controller\EpackManager\SolutionController.php` sur les routes liées aux optionsUI :
  > Mettre à jour les méthodes et les routes concernées pour inclure les nouvelles options CanGoBackHome et IsWebEPH.

- Mise à jour du front dans `templates\epack_manager\solution\show.html.twig` :
  > Ajouter les champs pour CanGoBackHome et IsWebEPH dans le template HTML du front, permettant aux utilisateurs de les modifier via l'interface backoffice.

# Modifications apportées

## 1er fichier :

Je créé à partir du ticket sur Jira une branche GitLab avec la commande git checkout -b TW-631-backoffice-option-ui-rebranding afin que le Gitlab soit lié au ticket Jira.

`/opt/epack/backoffice-dev/src/Controller/EpackManager/SolutionController.php`

Suite à mon [1er ticket](https://github.com/users/theox33/projects/1?pane=issue&itemId=72105190) qui consistait à ajouter en back les deux nouveaux paramètres `IsWebEPH` pour masquer/afficher l’URL et `CanGoBackHome` pour _masquer/afficher_ le bouton retour sur la solution, il me faut ajouter la gestion de ces paramètres sur l’interface `Back-office-Manager-V4` pour que l’équipe de développement puisse y avoir accès lors de la création de solutions et modules `CUSTOM`.

J’ai fait une recherche de `optionui` dans ce fichier afin de voir si je dois ajouter des informations pour donner l’accès à mes nouveaux paramètres.

> J’ai donc finalement trouvé une portion de code commentée :
> 
> ``` php
> #[Route(path: '/{solutionId}/save-types-functions', name: 'save_types_functions', methods: ['POST'])]
>     public function sauvegarderTypesFonctions(Solution $solution, Request $request, EntityManagerInterface $entityManager): JsonResponse
>     {
>         $selectedOptionsJson = $request->request->get('selectedOptions');
>         $selectedOptions = json_decode($selectedOptionsJson);
>         $entityManager = $this->em('epack_data');
> 
>         //On parcours la list des modules
>         foreach ($selectedOptions as $option) {
>             $typeFunction = $entityManager->getRepository(SettingsOptionui::class)->findOneBy([
>                         'solutionId' => $solution->getSolutionId(),
>                         'typefunction' => $option->id,
>                         'id' => $option->idTypeFunction
>             ]);
>             //Si il existe on le met à jour
>             if($typeFunction instanceof SettingsOptionui){
>                 $typeFunction
>                     ->setButtontext($option->buttonText)
>                     ->setButtonaction($option->buttonAction)
>                     ->setIsactive($option->isActive);
>                     /*
>                     ->setIswebeph($option->isWebEPH);
>                     ->setCangobackhome($option->canGoBackHome);
>                     */
>             }
>             //Sinon on créer un nouveau
>             else{
>                 if($option->isActive){
>                     $typeFunction = new SettingsOptionui();
>                     $typeFunction
>                         ->setId($option->idTypeFunction)
>                         ->setTs(date('Y-m-d H:i:s'))
>                         ->setTypefunction($option->id)
>                         ->setButtontext($option->buttonText)
>                         ->setButtonimage('')
>                         ->setButtonaction($option->buttonAction)
>                         ->setSolutionId($solution->getSolutionId())
>                         ->setIsactive($option->isActive);
>                         /*
>                         ->setIswebeph($option->isWebEPH);
>                         ->setCangobackhome($option->canGoBackHome);
>                         */
>                 }
>             }
>             $entityManager->persist($typeFunction);
>         }
>         $entityManager->flush();
>         return new JsonResponse(['message' => 'Les modules ont été sauvegardés avec succès.']);
>     }
> ```
> 
> Cette portion de code PHP fait partie d'un contrôleur dans un framework PHP moderne comme Symfony. Elle définit une méthode d'action qui est utilisée pour sauvegarder les types de fonctions associés à une solution spécifique.
> 
> Dans de grandes lignes, cette méthode récupère les options sélectionnées envoyées dans une requête POST, vérifie si chaque option existe déjà dans la base de données, met à jour les options existantes ou crée de nouvelles entrées si nécessaire, puis sauvegarde toutes les modifications dans la base de données. Elle retourne finalement une réponse JSON confirmant la réussite de l'opération.
> 

Ainsi, il faut que j’y intègre mes deux nouvelles options.
J’ai ajouté 4 lignes que j’ai mises en commentaires (l 954-955 & l 972-973).

J’ai également modifié la méthode `getActiveTypeFunctions` :

``` php
#[Route(path: '/{solutionId}/optionui-data', name: 'epack_manager_solution_show_optionUi_data', methods: ['GET'])]
    public function getActiveTypeFunctions(Solution $solution)
    {
        $repository = $this->em('epack_data')->getRepository(SettingsOptionui::class);
        $activeTypeFunctions = $repository->findBy(['solutionId' => $solution->getSolutionId()]);

        $result = [];
        foreach ($activeTypeFunctions as $activeTypeFunction) {
            $result[] = [
                'IdTypeFunction' => $activeTypeFunction->getId(),
                'TypeFunction' => intval($activeTypeFunction->getTypefunction()),
                'ButtonAction' => $activeTypeFunction->getButtonAction(),
                'ButtonText' => $activeTypeFunction->getButtonText(),
                'IsActive' => $activeTypeFunction->getIsactive(),
                /*
                'IsWebEPH' => $activeTypeFunction->getIswebeph(),
                'CanGoBackHome' => $activeTypeFunction->getCangobackhome(),
                */
            ];
        }

        return new JsonResponse($result);
    }
```

Cette méthode récupère toutes les entrées SettingsOptionui actives associées à une solution spécifique à partir de la base de données, les transforme en un tableau associatif avec les informations nécessaires, puis retourne ces données sous forme de réponse JSON. Cela permet à un client (comme une application front-end) de récupérer facilement les informations sur les types de fonctions actifs pour une solution donnée.

Il faut donc ajouter dans ce tableau mes deux nouvelles entrées.

## 2e fichier : 

`templates\epack_manager\solution\show.html.twig`

En analysant ce programme, j’ai compris que ce code est un template HTML généré par Twig pour une application web Symfony, qui affiche les détails d'une solution (telle qu'une enseigne, une adresse, des utilisateurs associés, etc.) et permet diverses actions de gestion (comme l'édition, la suppression d'utilisateurs, la gestion des configurations et la mise à jour des statuts) via une interface interactive avec des tableaux, des boutons, et des modals.

Les nouveaux paramètres `IsWebEPH` et `CanGoBackHome` sont relatifs à des modules `CUSTOM`.
Il faut donc ajouter dans le tableau ci-dessous deux colonnes pour ces deux paramètres :
![Image](https://github.com/user-attachments/assets/6e5b89db-81e2-4ea5-a49f-2d0dba1d8e12)

Le nom de cette modale étant `Détails Modules :` , je recherche cela dans le code et je trouve la définition du tableau. J’y ajoute donc mes deux colonnes : 
![Image](https://github.com/user-attachments/assets/31ac5451-ff88-47c9-8914-287b308639bb)

Cette partie du code récupère les TypeFunctions actifs pour une solution donnée, vérifie leur correspondance avec une liste complète de TypeFunctions, et ajoute les détails des TypeFunctions actifs à une liste pour un traitement ou affichage ultérieur : 
![Image](https://github.com/user-attachments/assets/a3fbc3e2-91e5-4021-a1e5-d5b20c342166)
![Image](https://github.com/user-attachments/assets/8d4a6fad-356b-4755-817d-3e287cb12e4a)

### Implémentation des coches

Ensuite, il me faut définir des coches afin d’activer ou non les paramètres.
Avec Bootstrap V3, il est possible de créer des coches préfabriquées.

À noter que seulement les modules CUSTOM peuvent avoir des paramètres spécifiques pour `IsWebEPH` et `CanGoBackHome`. Ainsi, j’ai décidé pour tous les autres modules de tout de même afficher des coches mais désactivées (non-cliquables). Avec pour tous les modules `IsWebEPH` décoché, et `CanGoBackHome` coché car ce sont les valeurs par défaut qui ne seront pas modifiables pour ces modules.
Pour les modules CUSTOM, les coches devront être les mêmes mais activées (cliquables) cette fois-ci.

En regardant le programme dans les détails, j’ai pu comprendre que la méthode `isTypeFunction28` indique que le module est CUSTOM pour `true`.

En effet, j’ai souvent retrouvé cette ligne : 
``` javascript
const isTypeFunction28 = rowData.id === 28;
```
Il faut savoir que le tableau des optionsUI de cette modale possède plusieurs lignes prédéfinies, chacune associées à un service/cible particulier. Ces lignes sont repérées par un identifiant présent dans la constante `OptionsUIServiceOrder` :
``` javascript
const OptionsUiServiceOrder = [
        26, 1, 2, 3, 4, 9, 5, 6, 31, 7, 42, 50, 60, 18, 65, 66, 33, 79, 53, 76, 64, 52, 43, 8, 55, 56, 63, 54, 73, 10, 48, 37, 74, 47, 44, 59, 61, 45, 25, 51, 58, 67, 69, 32, 28
        ];
```

Puisque les modules CUSTOM sont toujours à la fin du tableau (il y en a un présent par défaut), alors `28` désigne donc un module `CUSTOM`.

Ainsi, si `isTypeFunction28` est vraie, on doit pouvoir interagir avec la coche et sinon, on ne peut pas interagir avec.

J’implémente donc mes deux coches (lignes en vert) de manière similaire aux autres colonnes déjà présentes dans le tableau :
![Image](https://github.com/user-attachments/assets/e07e51ce-40ce-4dbd-b801-67c5acf55009)

### Création d’un nouveau module CUSTOM

Il existe un bouton identifié par `’#duplicateCustomButton’` qui nous permet de créer un nouveau module CUSTOM. Il faut donc ajouter les valeurs par défaut de mes deux nouveaux paramètres lors de la création d’un nouveau module CUSTOM : 
![Image](https://github.com/user-attachments/assets/6e59d13c-f578-4ed0-8125-deaef3b079ea)

# Vérification

Pour donner suite aux 2 tickets précédents, il me fallait corriger quelques erreurs.
J’ai reçu un retour de la part de Noé sur mon ticket Jira avec les remarques :

![Image](https://github.com/user-attachments/assets/2c7bb11a-f0b8-4105-9f5c-eac475edb665)

La fenêtre est effectivement trop petite pour afficher le tableau complet. Une barre de scroll horizontale est apparue mais il serait mieux de ne pas avoir à l’utiliser.

De plus lorsque l’on décide de cocher/décocher un des deux paramètres, le bouton « Continuer » ne s’active pas : il est toujours désactivé et donc impossible d’appliquer les modifications (à moins de modifier un autre paramètre correctement implémenté du tableau).

Pour finir, une fois avoir modifier un des champs IsWebEPH ou CanGoBackHome puis validé, les colonnes dans la base de données ne sont pas modifiées.

Il me faut donc modifier quelques points dans mes programmes.

# Fix

Suite aux **remarques de Noé** _(Voir dans : [🔗 Vérification](https://github.com/users/theox33/projects/1/views/1?pane=issue&itemId=72574004))_ sur mes tickets précédents, je dois apporter quelques modifications pour que tout fonctionne comme souhaité.

## Fix : wider modal

Afin d’agrandir la modale pour lire le tableau en entier, j’ai apporté les changements suivants dans le `Back-Office-Manager-V4` : 
![Image](https://github.com/user-attachments/assets/3fe1ee73-962e-4b76-aa97-1f4b9fb0960b)

### Ajout de la classe modal-wider à la balise : 
`<div class="modal-dialog modal-xl modal-wider">`
L’ajout de cette classe `modal-wider` permet de cibler spécifiquement cette boîte de dialogue modale et lui appliquer des styles particuliers sans affecter d'autres boîtes de dialogue ayant la classe modal-xl.

### Ajout de la règle CSS .modal-wider :

``` css
.modal-wider {
width: 90%;
}
```
Cette règle CSS ajuste la largeur de la boîte de dialogue à 90% de la largeur de son conteneur parent. En appliquant cette classe à la balise `<div>` de la boîte de dialogue, j’augmente donc sa largeur.

## Fix : enable continue buton

J’ai effectivement oublié d’activer le bouton « Continuer » pour enregistrer les modifications d’états de mes coches.

> Comme le bouton à bascule déjà implémenté « sélectionner/sélectionné » active le bouton « Continuer », j’ai observé s’il n’y avait pas d’appels de fonction relatif au bouton « continuer » dans sa déclaration :
> ``` twig
> {
>   title: "Action", className: 'no-edit',
>   data: null,
>   render: function(data, type, row)
>   {
>       //Modification du bouton de selection
>       const btnClass = row.isActive ? 'btn-success' : 'btn-primary';
>       const btnText = row.isActive ? 'Sélectionné' : 'Sélectionner';
>       // if(row.id === 28){
>       //     return `<button class="select-button btn ${btnClass}" data-value="${row.name}">${btnText}</button>
>       //     <button class="delete-button btn btn-danger" data-value="${row.name}">Supprimer</button>`;
>       // }
>       return `<button class="select-button btn ${btnClass}" data-value="${row.name}">${btnText}</button>`;
> }
>                                     
> ```

La seule chose remarquable, est que le bouton « Action » a pour classe « select-button ». Il doit surement y avoir une fonction qui s’en sert comme argument.

> En recherchant le nom de cette classe, j’ai trouvé une fonction JS d’évènement de clic :
> ``` javascript
> //Bouton de selection
>                             $('#newOptionUI').on('click', '.select-button', function () {
>                                 const button = $(this);
>                                 const rowData = dataTableInstance.row(button.closest('tr')).data();
> 
>                                 // Bascule la valeur de la propriété isActive
>                                 rowData.isActive = !rowData.isActive;
>                                 if(rowData.idTypeFunction == ''){
>                                     const maxRand = 999999999999;
>                                     const rand = Math.floor(Math.random() * maxRand) + Math.floor(Math.random() * maxRand);
>                                     rowData.idTypeFunction = rand.toString();
>                                 }
> 
>                                 // Met à jour la classe et le texte du bouton
>                                 const btnClass = rowData.isActive ? 'btn-success' : 'btn-primary';
>                                 const btnText = rowData.isActive ? 'Sélectionné' : 'Sélectionner';
> 
>                                 button.removeClass('btn-primary btn-success').addClass(btnClass);
>                                 button.text(btnText);
> 
>                                 // console.log('Data after click:', dataTableInstance.data().toArray());
>                                 updateContinueButtonState();
>                             });
> ```

Lorsque l’on clique sur le bouton « Continuer », cette méthode est appelée. Ce qui est intéressant ici, c’est l’appel à la méthode « updateContinueButtonState() ». En recherchant cette méthode, je l’ai retrouvée dans d’autres méthodes liées aux autres champs modifiables du tableau. Il est évident qu’il s’agit du changement d’état du bouton « Continuer ».

>  Cela est par ailleurs confirmé lorsque je regarde le contenu de cette méthode :
> ``` javascript
> // Met à jour le bouton en fonction de la longueur de activeTypeFunctions
>     function updateContinueButtonState() {
>         if (activeTypeFunctions.length > 0) {
>             $('#submitOptionsForm').removeAttr('disabled');
>         } else {
>             $('#submitOptionsForm').attr('disabled', 'disabled');
>         }
>     }
> ```

Ainsi, il faut que je créé une méthode qui au clic de la coche, appelle la méthode `updateContinueButtonState` :
``` javascript
//Checkbox pour afficher l'URL
$('#newOptionUI').on('change', '.show-url-checkbox', function () {
    const checkbox = $(this);
    const rowData = dataTableInstance.row(checkbox.closest('tr')).data();

    // Bascule la valeur de la propriété isWebEPH
    rowData.isWebEPH = checkbox.is(':checked');

    // console.log('Data after click:', dataTableInstance.data().toArray());
    updateContinueButtonState();
});

//Checkbox pour afficher le bouton retour
$('#newOptionUI').on('change', '.show-back-button-checkbox', function () {
    const checkbox = $(this);
    const rowData = dataTableInstance.row(checkbox.closest('tr')).data();

    // Bascule la valeur de la propriété canGoBackHome
    rowData.canGoBackHome = checkbox.is(':checked');

    // console.log('Data after click:', dataTableInstance.data().toArray());
    updateContinueButtonState();
});
```

## Fix : update columns

Dans les mêmes méthodes ci-dessus, je dois effectuer la bascule des valeurs des propriétés `isWebEPH` et `canGoBackHome` sinon les modifications ne vont pas s’effectuer dans la base de données.

## Fix : oubli

Dans le fix que j’ai apporté hier, j’ai oublié d’y ajouter la fonction JS permettant d’activer le bouton `continuer` au clic de la coche `CanGoBackHome`. Ainsi que le fait que ces coches-ci doivent être désactivées mais également cochées par défaut.

Je l’ai donc ajouté ce matin :

![Image](https://github.com/user-attachments/assets/10c414ca-d83d-4f20-8303-252996e06782)

Je peux maintenant `merge` ma branche et tester à nouveau les fonctionnalités sur l’application web.

# Tests et Vérification

## Mise en place

Afin de tester mes modifications je dois effectuer deux tests : 
-	Au sein du « Back-Office-Manager-V4 » et la base de données
-	Dans l’application « ePack Hygiene »

Je créé donc une solution dans le back-office-manager :

![Image](https://github.com/user-attachments/assets/4964161d-fbe7-4bf3-8ea6-427fd82fd096)

Il s’agit là d’un faux restaurant afin de simuler le comportement de ma version sur le système.

Je me connecte en SSH au serveur du `Back-Office-Manager-V4`, pull mon git et lance `composer install` dans l’invite de commande pour dockeriser ma version du répertoire.

Une fois que c’est fait, je vais sur `DBeaver` et affiche uniquement les colonnes de la table `settings_OptionUI` liées à ma solution.


## Test du `Back-Office-Manager`


**Plan de test qualité**

| **Mise en place**                                                       | **Actions**                                | **Observations attendues**                                                                                          | **Observations réelles**                                                                                            | **Conclusion**                                                                                                                                      | **Qu’est-ce que j’ai vérifié ?**                                                      |
|---------------------------------------------------------------------|----------------------------------------|-----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| _Description de l’état du logiciel testé afin d’effectuer le test souhaité._ | _Les actions effectuées par le testeur._ | _La réaction souhaitée du logiciel, ce qu’il doit faire_                                                          | _La réaction du logiciel, ce qu’il affiche._                                                                      | _Test ok ou problème détecté par rapport à ce qui est attendu du logiciel ou ne peux/sais pas conclure._       | _À quoi sert ce test._                                                              |
| Ligne CUSTOM existant déjà en BDD                                   | Clic sur coche CanGoBackHome           | -> Colonne CanGoBackHome = 0<br>-> Bouton « Continuer » activé                                                  | -> Colonne CanGoBackHome = 0<br>-> Bouton « Continuer » activé                                                  | Test ok                                                                                                                                         | Le changement d’état d’une valeur par défaut de CanGoBackHome pris en compte dans la BDD.                  |
| Etat initial                                                        | Clic sur « Ajouter un module CUSTOM »  | Nouvelle ligne avec colonnes « IsWebEPH » = 0 et « CanGoBackHome » = 1 dans modale et BDD                       | Nouvelle ligne avec colonnes « IsWebEPH » = 0 et « CanGoBackHome » = 1 dans modale et BDD                       | Ok                                                                                                                                              | Les valeurs par défaut sont bien initialisées à la création d’un module CUSTOM.                            |
| - Nouveau CUSTOM<br>- Colonne « IsWebEPH » = 1<br>- « CanGoBackHome » = 0 | Clic sur coche « IsWebEPH »           | -> Colonne « IsWebEPH » = 0<br>-> Bouton « Continuer » activé<br>-> « CanGoBackHome » = 0                       | -> Colonne « IsWebEPH » = 0<br>-> Bouton « Continuer » activé<br>-> « CanGoBackHome » = 0                       | Ok                                                                                                                                              | Le changement d’état d’une valeur antérieurement modifiée de IsWebEPH pris en compte dans la BDD.          |
| - Nouveau CUSTOM<br>- « IsWebEPH » = 0<br>- « CanGoBackHome » = 0   | Clic sur coche « CanGoBackHome » puis « IsWebEPH » | -> Colonne « CanGoBackHome » = 1<br>-> Bouton « Continuer » activé<br>-> « IsWebEPH » = 1                       | -> Colonne « CanGoBackHome » = 1<br>-> Bouton « Continuer » activé<br>-> « IsWebEPH » = 1                       | Ok                                                                                                                                              | Les deux coches peuvent activer le bouton « Continuer » et le changement de valeur s’effectue pour plusieurs modifications à la fois            |

## Démonstration

### 1er test

> J’ai décoché les deux cases précédemment activées du module CUSTOM : 
> 
> ![Image](https://github.com/user-attachments/assets/4854d2e4-96af-469f-aaee-ccf3bd40aca7)
> 
> ![Image](https://github.com/user-attachments/assets/3da8627c-ba8f-4403-998b-46e5d0c6d76e)

### 2e test

> Et je les active à nouveau : 
> 
> ![Image](https://github.com/user-attachments/assets/b7ea0c45-7aa5-42cc-a3a3-2ec1f2272fa1)
> 
> ![Image](https://github.com/user-attachments/assets/0698fb36-9103-4a6c-86c9-93aa66cb0f77)

### 3e test

> J’ai également créé un nouveau module CUSTOM, et activé les deux coches : 
> 
> ![Image](https://github.com/user-attachments/assets/9f9bbc56-74f1-46dd-b7fb-1ec87823bc01)
