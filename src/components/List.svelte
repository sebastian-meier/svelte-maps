<script>
  import { loaded, locations, currentLocationID } from "../stores/locations";
</script>

<div>
  <table>
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
  tr.selected {
    background-color: rgb(75, 75, 75);
    color: white;
  }

  div {
    overflow: scroll;
    flex-grow: 1;
  }
</style>