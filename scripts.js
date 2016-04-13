var comptage = 0 ;
var longueur = 0 ;
var click = false ; 
var texte ; 

$(document).ready(function(){
	
	$("#go").click(function(){
		
		comptage = 0 ; 
		click = false ; 
		texte = null ; 
		
		$('#texteAffiche').empty() ;
		$('#zoneEnvoi').empty() ; 
		
		var tableauTopFin = new Array() ;
		var tableauLeftFin = new Array() ;
		
		longueur = recupereTexteEtSepare().length ;  
		
		for (var i=0 ; i < longueur ; ++i){
			$('<span id="'+i+'">'+recupereTexteEtSepare()[i]+'</span>').appendTo('#texteAffiche') ;	
		}
		
		for (var i=0 ; i < longueur ; ++i){
			var topFin = ($("#"+i)).offset().top, leftFin = ($("#"+i)).offset().left ;
			tableauTopFin.push(topFin) ;
			tableauLeftFin.push(leftFin) ;
		}
		
		for (var i=0 ; i < longueur ; ++i){		
			$("#"+i).css("position", "absolute") ;
			lettreInitialisation(i, tableauTopFin[i] , tableauLeftFin[i]) ;		
		}
		
	})
	
})

function recupereTexteEtSepare(){
	
	texte = $("#texte").val() ;
	
	var tableauCaracteres = new Array() ;
	
	for (var i = 0 ; i < texte.length ; ++i){
		tableauCaracteres.push(texte.charAt(i)) ; 
	}
	
	return tableauCaracteres ;
}

function lettreInitialisation(idLettre, topFin, leftFin){
	
	var haut = 1, bas = 2, gauche = 3, droite = 4 ;
	var topDebut = topFin, leftDebut = leftFin ;
	var coteDepart = Math.floor(Math.random() * (4 - 1 + 1) + 1);
	var topPlateau = $("#plateau").offset().top;
	var heightPlateau = parseInt($("#plateau").css("height")) ;
	var leftPlateau = $("#plateau").offset().left ;
	var widthPlateau = parseInt($("#plateau").css("width")) ;
	 
	switch (coteDepart){
		case haut: 
			topDebut = topPlateau ;
			leftDebut = Math.random() * ((leftPlateau+widthPlateau) - leftPlateau) + leftPlateau ;
			break ; 
		case bas: 
			topDebut = topPlateau + heightPlateau - parseInt($("#" + idLettre).css("height")) + 3 ;
			leftDebut = Math.random() * ((leftPlateau+widthPlateau) - leftPlateau) + leftPlateau;
			break ;
		case gauche: 
			topDebut = Math.random() * ((topPlateau+heightPlateau) - topPlateau) + topPlateau ;
			leftDebut = leftPlateau ;
			break ;
		case droite: 
			topDebut = Math.random() * ((topPlateau+heightPlateau) - topPlateau) + topPlateau ;
			leftDebut = leftPlateau + widthPlateau - parseInt($("#" + idLettre).css("width")) + 3;
			break ; 
	}
	
	$("#" + idLettre).css('top', topDebut+'px' ) ;
	$("#" + idLettre).css('left', leftDebut+'px') ;
	 
	 mouvementLettre(idLettre, topFin, leftFin) ; 
}

function mouvementLettre(idLettre, topFin, leftFin){
	
	$("#"+idLettre).animate(
			{
				left: leftFin,
				top: topFin
			},
			2000,
			'swing',
			function(){
						//on peut par exemple implanter une fonction de transmission de ce message en callback
			}
	);
}

