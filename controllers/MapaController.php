<?php

namespace Controllers;

use MVC\Router;
use Model\Mapa;
use Exception;

class MapaController
{
    public static function index(Router $router)
    {
        $router->render('mapa/index', []);
    }

    public static function buscarAPI()
    {
        $coor_descr = $_GET['coor_descr'] ?? '';
        $sql = "SELECT * FROM coordenadas WHERE coor_situacion = '1' ";

        if (!empty($coor_descr)) {
            $coor_descr = strtoupper($coor_descr);
            $sql .= " AND LOWER(coor_descr) LIKE '%$coor_descr%' ";
        }

        try {
            $mapas = Mapa::fetchArray($sql); 
            echo json_encode($mapas);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }
}
