const {Delivery} = require('../models')

module.exports = {
  async addDelivery (req, res) {
    try {
      console.log(req.body)
      const delivery = await Delivery.create(req.body)
      res.send(delivery.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'delivery already exist.'
      })
    }
  },
  async getAllDeliverys (req, res) {
    try {
      const delivery = await Delivery.findAll({
        Limit:50,
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log("Found delivery")
      res.send(delivery)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get delivery'
      })
    }
  },
  async getAllDeliveryByUser (req, res) {
    try {
      const delivery = await Delivery.findAll({
        limit: 50,
        where: { orderTakenBy: req.params.id },
        order: [
          ['estimatedDeliveryTime', 'ASC']
        ]
      })
      console.log("Found delivery")
      res.send(delivery)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get delivery'
      })
    }
  },
  async getDeliveryById (req, res) {
    try {
      const delivery = await Delivery.findOne({
        where: { id: req.params.id }
      })
      console.log("Found delivery")
      res.send(delivery)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get delivery'
      })
    }
  },
  async deleteDelivery (req, res) {
    try {
      const delivery = await Delivery.destroy({
        where: { id: req.params.id}
      })
      console.log("Deleted delivery")
      res.send({status: "Success", deleteddeliverys: delivery})
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete delivery: ' + err
      })
    }
  },
  async updateDelivery (req, res) {
    console.log(req.body)
    console.log(req.params.id)
    try {
      const delivery = await Delivery.update({
        pickupCustomerName: req.body.pickupCustomerName,
        pickupCustomerId: req.body.pickupCustomerId,
        pickupAvn: req.body.pickupAvn,
        pickupStreet: req.body.pickupStreet,
        pickupTime: req.body.pickupTime,
        pickupRoute: req.body.pickupRoute,
        pickupActualTime: req.body.pickupActualTime,
        deliveryCustomerName: req.body.deliveryCustomerName,
        deliveryCustomerId: req.body.deliveryCustomerId,
        deliveryAvn: req.body.deliveryAvn,
        deliveryStreet: req.body.deliveryStreet,
        deliveryTime: req.body.deliveryTime,
        deliveryRoute: req.body.deliveryRoute,
        deliveryActualTime: req.body.deliveryActualTime,
        deliveryStatus: req.body.deliveryStatus,
        orderTakenBy: req.body.orderTakenBy,
        estimatedPrice: req.body.estimatedPrice,
        assignedTime: req.body.assignedTime,
        status: req.body.status,
        estMin: req.body.estMin,
        deliveryTimeMin: req.body.deliveryTimeMin,
        isBonus: req.body.isBonus
      } ,{
        where:{ id: req.params.id }
      })
      console.log("Updated delivery: " + delivery)
      res.send({status: "Success", updateddeliverys : delivery})
    } catch (err) {
      res.status(500).send({
        error: 'An error while trying to update delivery: ' + err
      })
    }
  },
  GetShortestDistance (req,res) {
    var source = req.body.source
    var destination = req.body.destination

    var map = {
      A1: { A2: 1},
      A2: { B2: 1, A3: 1 },
      A3: { A4: 1 },
      A4: { A5: 1, B4: 1 },
      A5: { A6: 1 },
      A6: { A7: 1, B6: 1 },
      A7: {},
      B1: { A1: 1 },
      B2: { A2: 1, C2: 1, B1: 1 },
      B3: { A3: 1, B2: 1 },
      B4: { B3: 1, C4: 1 },
      B5: { B4: 1, A5: 1 },
      B6: { A6: 1, C6: 1, B5: 1 },
      B7: { A7: 1,B6: 1 },
      C1: { B1: 1, C2: 1 },
      C2: { B2: 1, C3: 1, D2: 1 },
      C3: { B3: 1, C4: 1 },
      C4: { C5: 1, D4: 1 },
      C5: { B5: 1, C6: 1 },
      C6: { B6: 1, C7: 1, D6: 1 },
      C7: { B7: 1 },
      D1: { C1: 1, D2: 1 },
      D2: { D1: 1, C2: 1, D3: 1, E2: 1 },
      D3: { C3: 1, D2: 1, D4: 1 },
      D4: { D3: 1, E4: 1, D5: 1 },
      D5: { D4: 1, C5: 1, D6: 1 },
      D6: { D5: 1, B6: 1, D7: 1, E6: 1 },
      D7: { C7: 1, D6: 1 },
      E1: { D1: 1, E2: 1 },
      E2: { D2: 1, E3: 1, F2: 1 },
      E3: { D3: 1, E4: 1 },
      E4: { E5: 1, F4: 1 },
      E5: { D5: 1, E6: 1 },
      E6: { D6: 1, E7: 1, F6: 1 },
      E7: { D7: 1 },
      F1: { E1: 1 },
      F2: { E2: 1, F1: 1, G2: 1 },
      F3: { E3: 1, F2: 1, },
      F4: { F3: 1, G4: 1  },
      F5: { F4: 1, E5: 1 },
      F6: { F5: 1, E6: 1, G6: 1 },
      F7: { F6: 1, E7: 1 },
      G1: { G2: 1, F1: 1 },
      G2: { G3: 1, F2: 1 },
      G3: { G4: 1, F3: 1 },
      G4: { G5: 1 },
      G5: { G6: 1, F5: 1 },
      G6: { G7: 1, F6: 1 },
      G7: { F7: 1 }
    }

    var path = module.exports.findShortestPath(map, source, destination)

    console.log(path)

    res.send({status: "Success", shortestPath : path})
  },

  findShortestPath (graph, startNode, endNode) {
    // object for recording distances from the start node
    let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);
  
    // track paths
    let parents = { endNode: null };
    for (let child in graph[startNode]) {
      parents[child] = startNode;
    }
  
    // track visited nodes
    let visited = [];
  
    // find the nearest node
    let node = module.exports.shortestDistanceNode(distances, visited);
  
    // for that node
    while (node) {
      // find its distance from the start node & its child nodes
      let distance = distances[node];
      let children = graph[node];
      // for each of those child nodes
      for (let child in children) {
        // make sure each child node is not the start node
        if (String(child) === String(startNode)) {
          console.log("don't return to the start node! 🙅");
          continue;
        } else {
          console.log("startNode: " + startNode);
          console.log("distance from node " + parents[node] + " to node " + node + ")");
          console.log("previous distance: " + distances[node]);
          let newdistance = distance + children[child];
          console.log("new distance: " + newdistance);
          // record the path
          if (!distances[child] || distances[child] > newdistance) {
            distances[child] = newdistance;
            parents[child] = node;
            console.log("distance + parents updated");
          } else {
            console.log("not updating, because a shorter path already exists!");
          }
        }
      }
      visited.push(node);
      node = module.exports.shortestDistanceNode(distances, visited);
    }
  
    // record shortest path
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }
    shortestPath.reverse();
  
    // return the shortest path & no of blocks
    let results = {
      distance: distances[endNode],
      path: shortestPath,
    };
  
    return results;
  },
  shortestDistanceNode (distances, visited) {
    let shortest = null;
  
    for (let node in distances) {
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
    return shortest;
  }
}
