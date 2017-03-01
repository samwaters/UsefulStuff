<?php
/*
 * Server status script
 * @author Sam Waters <sam@samwaters.com>
 */
$start = microtime(true);
$uptime = trim(`uptime`);
$daysup = array();
preg_match("/up\s([^,]+),/", $uptime, $daysup);
$load = array();
preg_match("/average\:\s([^,]+),\s([^,]+),\s([^,]+)$/", $uptime, $load);
header("Content-type: application/json");
$data = array();
$data["uptime"] = isset($daysup[1]) ? $daysup[1] : "Unknown";
$data["load1"] = isset($load[1]) ? $load[1] : "Unknown";
$data["load5"] = isset($load[2]) ? $load[2] : "Unknown";
$data["load15"] = isset($load[3]) ? $load[3] : "Unknown";
$data["responsetime"] = round((microtime(true) - $start) * 1000, 2) . "ms";
echo json_encode($data);
