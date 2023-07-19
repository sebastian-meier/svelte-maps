<script>
  import { loaded, locations, currentLocationID } from "../stores/locations";
</script>

<div>
  <table cellpadding="0" cellspacing="0">
    <thead>
      <tr>
        <th>Rating</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {#if $loaded && $locations}
      {#each $locations as l, li}
      <tr
        on:click={() => {
          currentLocationID.set(li);
        }}
        class:selected={li == $currentLocationID}>
        <td>{l.rating}</td>
        <td>{l.Name}</td>
      </tr>
      {/each}
      {/if}
    </tbody>
    <tfoot>
      <tr>
        <th>Rating</th>
        <th>Name</th>
      </tr>
    </tfoot>
  </table>
</div>

<style lang="scss">
  table {
    width: 100%;
    font-size: 12px;
  }

  thead, tfoot{
    background-color: rgb(100, 100, 100);
    color: white;
    font-weight:bold;
    text-align:left;
  }

  table, tr, td, th, thead, tfoot{
    padding:0;
    margin:0;
    border:none;
  }

  td{
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  }

  td, th{
    padding: 2px 5px;
  }

  tr:hover {
    background-color: rgba(100, 100, 100, 0.15);
  }

  tr.selected {
    background-color: rgba(100, 100, 100, 0.3);
  }

  div {
    overflow: scroll;
    flex-grow: 1;
  }

  tr{
    cursor: pointer;
  }
</style>